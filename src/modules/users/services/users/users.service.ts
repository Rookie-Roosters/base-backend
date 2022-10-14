import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import to from 'await-to-js';

import { User } from '@users/entities';
import { UserCreateDto, UserUpdateDto } from '@users/dto';
import { Authentication } from '@authentication/entities';
import { UserSignUpDto } from '@users/dto/user-signup.dto';
import { AuthenticationService } from '@authentication/services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthenticationService,
  ) {}

  async create(dto: UserCreateDto, authentication?: Authentication): Promise<User> {
    const user = this.usersRepository.create({ ...dto, authentication });
    const [err] = await to(this.usersRepository.save(user));
    if (err) throw new ForbiddenException(err.name, err.message);
    return user;
  }

  async signUp(dto: UserSignUpDto): Promise<User> {
    const authentication = await this.authService.createRegistry({
      identifier: dto.email,
      plainTextPassword: dto.password,
    });
    const user = this.usersRepository.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      authentication,
    });
    const [err] = await to(this.usersRepository.save(user));
    if (err) throw new ForbiddenException(err.name, err.message);
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

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
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
