import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import to from 'await-to-js';
import * as fs from 'fs';
import { User } from '@users/entities';
import { UserCreateDto, UserUpdateDto } from '@users/dto';
import { Authentication } from '@authentication/entities';
import { Company } from '@companies/entities';
import { STORAGE_PATHS } from '@core/constants/storage_paths.constant';
import { StreamableFile } from '@nestjs/common/file-stream';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: UserCreateDto, authentication?: Authentication): Promise<User> {
    const user = this.usersRepository.create({ ...dto, authentication });
    const [err] = await to(this.usersRepository.save(user));
    if (err) throw new ForbiddenException(err.name, err.message);
    return user;
  }

  async find(options?: FindManyOptions<User>): Promise<User[]> {
    const users = this.usersRepository.find(options);
    return users;
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    const user = await this.usersRepository.findOne(options);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateById(id: number, dto: UserUpdateDto): Promise<User> {
    const user = await this.usersRepository.preload({ id, ...dto });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.update({ id }, dto);
    return user;
  }

  async getIcon(id: number) : Promise<StreamableFile>{
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    if (user.icon) {
      const path = `${STORAGE_PATHS.USER_ICONS}/${user.icon}`;
      if(fs.existsSync(path)) {
        const file = fs.createReadStream(path);
        return new StreamableFile(file, {
          type: 'image/jpg'
        });
      }
    }
    throw new ForbiddenException('Icon must exist');
  }

  async updateIcon(id: number, icon: Express.Multer.File): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    if (user.icon) {
      const path = `${STORAGE_PATHS.USER_ICONS}/${user.icon}`;
      if (fs.existsSync(path)) {
        if (fs.existsSync(path)) fs.unlinkSync(path);
      }
    }
    user.icon = icon.filename;
    return await this.usersRepository.save(user);
  }

  async deleteById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return await this.usersRepository.remove(user);
  }

  async addCompany(id: number, company: Company) {
    const user = await this.findOne({ where: { id } });
    user.company = company;
    await this.usersRepository.save(user);
  }

  async removeCompany(id: number) {
    const user = await this.findOne({ where: { id } });
    user.company = null;
    await this.usersRepository.save(user);
  }
}
