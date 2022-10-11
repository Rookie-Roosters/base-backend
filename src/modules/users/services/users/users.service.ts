import { ImATeapotException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@users/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  async create() {
    const createdUser = new this.usersModel();
    return await createdUser.save();
  }

  async testoSev(): Promise<User> {
    throw new ImATeapotException('tipot es');
  }

  async getAll(): Promise<User[]> {
    return this.usersModel.find();
  }
}
