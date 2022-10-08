import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async create() {
    const createdUser = new this.usersModel();
    return await createdUser.save();
  }

  async addSocketConnection(_id: string, socket: string): Promise<void> {
    //Check if the user exits
    await this.usersModel.updateOne(
      { _id },
      {
        $push: {
          sockets: socket,
        },
      },
    );
  }

  async deleteSocketConnection(_id: string, socket: string): Promise<void> {
    //Check if the user exists
    await this.usersModel.updateOne(
      { _id },
      {
        $pull: {
          sockets: socket,
        },
      },
    );
  }

  async getSockets(_id: string): Promise<string[]> {
    const user = await this.usersModel.findOne({_id}); //Change for a better function
    return user.sockets;
  }
}
