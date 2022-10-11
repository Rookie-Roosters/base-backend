import { ResponseChatDto, ResponseMessageDto, ResponseShortChatDto } from '@chats/dtos';
import { Chats, Message, ChatDocument } from '@chats/schemas';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chats.name) private chatsModel: Model<ChatDocument>) {}

  async create(currentUser: string, receiver: string): Promise<ResponseChatDto> {
    if (currentUser == receiver) throw new ForbiddenException('Current User cannot be the Receiver at the same time');
    if ((await this.count(currentUser, receiver)) > 0) throw new ForbiddenException("Chat mustn't exists");
    else {
      const createdChat = new this.chatsModel({
        user1: currentUser,
        user2: receiver,
        messages: [],
      });
      const chat = await createdChat.save();
      return {
        _id: chat._id,
        user: chat.user1 == currentUser ? chat.user2 : chat.user1,
        messages: chat.messages,
      };
    }
  }

  async chats(currentUser: string): Promise<ResponseShortChatDto[]> {
    const chats = await this.chatsModel
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
    return chats.map((chat) => {
      return {
        _id: chat._id,
        user: chat.user1 == currentUser ? chat.user2 : chat.user1,
        lastMessage: chat.lastMessage,
      };
    });
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

  async chat(currentUser: string, receiver: string, page: number): Promise<ResponseChatDto> {
    if (page < 0) throw new ForbiddenException('Page must be greater than 0');
    const first = page * 20;
    const second = page + 1 * 20 - 1;
    if ((await this.count(currentUser, receiver)) == 0) throw new ForbiddenException('Chat must exists');
    else {
      const chat = (
        await this.chatsModel.aggregate([
          {
            $match: {
              $or: [
                {
                  user1: new mongoose.Types.ObjectId(currentUser),
                  user2: new mongoose.Types.ObjectId(receiver),
                },
                {
                  user1: new mongoose.Types.ObjectId(receiver),
                  user2: new mongoose.Types.ObjectId(currentUser),
                },
              ],
            },
          },
          {
            $project: {
              _id: '$_id',
              user1: '$user1',
              user2: '$user2',
              messages: {
                $slice: [{ $reverseArray: '$messages' }, first, second],
              },
            },
          },
        ])
      )[0];
      return {
        _id: chat._id,
        user: chat.user1 == currentUser ? chat.user2 : chat.user1,
        messages: chat.messages,
      };
    }
  }

  async send(currentUser: string, receiver: string, message: string): Promise<ResponseMessageDto> {
    if ((await this.count(currentUser, receiver)) == 0) throw new ForbiddenException('Chat must exists');
    else {
      const createdMessage: Message = {
        date: new Date(),
        sender: currentUser,
        message,
      };
      await this.chatsModel.updateOne(
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
