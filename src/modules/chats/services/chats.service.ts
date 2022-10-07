import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ChatDocument, Chats } from '../schemas/chat.schema';
import { Message } from '../schemas/message.schema';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chats.name) private chatsModel: Model<ChatDocument>,
  ) {}

  async create(currentUser: string, receiver: string) {
    if ((await this.count(currentUser, receiver)) > 0)
      throw new ForbiddenException("Chat mustn't exists");
    else {
      const createdChat = new this.chatsModel({
        user1: currentUser,
        user2: receiver,
        messages: [],
      });
      return await createdChat.save();
    }
  }

  async chats(currentUser: string) {
    return await this.chatsModel
      .aggregate([
        {
          $match: {
            $or: [
              {
                user1: new mongoose.Types.ObjectId(currentUser),
              },
              {
                user2: new mongoose.Types.ObjectId(currentUser),
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user1',
            foreignField: '_id',
            as: 'user1',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user2',
            foreignField: '_id',
            as: 'user2',
          },
        },
        {
          $project: {
            _id: '$_id',
            user1: { $arrayElemAt: ['$user1', 0] },
            user2: { $arrayElemAt: ['$user2', 0] },
            lastMessage: { $last: '$messages' },
          },
        },
      ])
      .exec();
  }

  private async count(currentUser: string, receiver: string): Promise<number> {
    return await this.chatsModel
      .count({
        $or: [
          {
            user1: currentUser,
            user2: receiver,
          },
          {
            user2: currentUser,
            user1: receiver,
          },
        ],
      })
      .exec();
  }

  async chat(currentUser: string, receiver: string) {
    if ((await this.count(currentUser, receiver)) == 0)
      throw new ForbiddenException('Chat must exists');
    else {
      return await this.chatsModel
        .findOne({
          $or: [
            {
              user1: currentUser,
              user2: receiver,
            },
            {
              user2: currentUser,
              user1: receiver,
            },
          ],
        })
        .slice('messages', 2); //Modificar este para que aparezcan más mensajes
    }
  }

  async send(currentUser: string, receiver: string, message: string) {
    if ((await this.count(currentUser, receiver)) == 0)
      throw new ForbiddenException('Chat must exists');
    else {
      const createdMessage: Message = {
        date: new Date(),
        sender: currentUser,
        message,
      };
      const res = await this.chatsModel.updateOne(
        {
          $or: [
            {
              user1: currentUser,
              user2: receiver,
            },
            {
              user2: currentUser,
              user1: receiver,
            },
          ],
        },
        {
          $push: {
            messages: createdMessage,
          },
        },
      );
      return createdMessage;
    }
  }
}
