import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities';
import { Repository } from 'typeorm';
import { SendNotificationDto } from './dto/send-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService{
  /*constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    private readonly usersRepository: Repository<User>,
  ) {}
  
  async save(text: string, link: string, user:User) {
    const notification = this.notificationsRepository.create({text:text, link:link, date:Date.now(), isAlreadySeen:false, user:user});
    return await this.notificationsRepository.save(notification);
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
    await this.notificationsRepository.update(id, { isAlreadySeen: true })
  }

  async updateAllByUser(userId: number) {
    //await this.notificationsRepository.update({user:userId}, { isAlreadySeen: true })
  }*/
}
