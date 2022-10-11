import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@users/entities';
import { UserCreateDto, UserUpdateDto } from '@users/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: UserCreateDto): Promise<User> {
    const user = this.usersRepository.create(dto);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = this.usersRepository.find();
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateById(id: number, dto: UserUpdateDto): Promise<User> {
    const user = await this.usersRepository.preload({ id, ...dto });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.update({ id }, dto);
    return user;
  }

  async deleteById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return await this.usersRepository.remove(user);
  }
}
