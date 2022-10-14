import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities';
import { Repository } from 'typeorm';
import { SendNotificationDto } from './dto/send-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService{
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    private readonly usersRepository: Repository<User>,
  ) {}
  
  async save(notification: Notification) {
    await this.notificationsRepository.save(notification);
  }

  async findByUser(userId: number) {
    return await this.notificationsRepository.find({
      where: {
          user: {
              id: userId,
          },
      },
    });
  }


  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return await this.notificationsRepository.save({id: id, isAlreadySeen: true})
  }

  async updateAllByUser(userId: number) {
    //const notifications = await this.notificationsRepository.createQueryBuilder().update(Notification).set({isAlreadySeen: true}).where("user = :user", { id: userId }).execute()
  }
}
