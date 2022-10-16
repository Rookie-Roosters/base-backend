import { MessageDto, ResponseChatDto } from '@chats/dtos';
import { Chat, Message } from '@chats/entities';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities';
import { UsersService } from '@users/services';
import { Repository } from 'typeorm';

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOjEsImlkZW50aWZpZXIiOiJsZW9uZWxAbGVvbmVsLmNvbSIsImlhdCI6MTY2NTkzOTI1NywiZXhwIjoxNjY1OTM5ODU3fQ.fQsJ2e0_KO-sYEzqhbCqL40ppA_g3wOsffJR2wKd_Ek
@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    private usersService: UsersService,
  ) {}

  async create(currentUser: User, receiver: number): Promise<ResponseChatDto> {
    const receiverUser = await this.usersService.findOne({ where: { id: receiver } });
    if (currentUser.id != receiverUser.id) {
      if (
        !(await this.chatsRepository.findOne({
          where: [
            { user1: currentUser, user2: receiverUser },
            { user2: currentUser, user1: receiverUser },
          ],
        }))
      ) {
        const createdChat = await this.chatsRepository.save({
          user1: currentUser,
          user2: receiverUser,
        });
        if (createdChat) {
          return {
            id: createdChat.id,
            user: createdChat.user2,
            messages: [],
          };
        } else throw new ForbiddenException('Chat not created');
      } else throw new ForbiddenException('Chat must not already exists');
    } else throw new ForbiddenException('Current User can not be the Receiving User');
  }

  async findAll(currentUser: User): Promise<ResponseChatDto[]> {
    const chats = await this.chatsRepository.find({
      where: [{ user1: currentUser }, { user2: currentUser }],
      relations: { user1: true, user2: true },
    });
    return await Promise.all(
      chats.map(async (chat) => {
        const message = await this.messagesRepository.findOne({
          where: {
            chat,
          },
          relations: {
            sender: true,
          },
          order: {
            date: 'DESC',
          },
        });
        return {
          id: chat.id,
          user: currentUser.id != chat.user1.id ? chat.user1 : chat.user2,
          messages: [
            {
              id: message.id,
              date: message.date,
              sender: message.sender.id,
              message: message.message,
            },
          ],
        };
      }),
    );
  }

  async find(currentUser: User, receiver: number, page: number): Promise<ResponseChatDto> {
    const receiverUser = await this.usersService.findOne({ where: { id: receiver } });
    if (currentUser.id != receiverUser.id) {
      const chat = await this.chatsRepository.findOne({
        where: [
          { user1: currentUser, user2: receiverUser },
          { user2: currentUser, user1: receiverUser },
        ],
        relations: {
          user1: true,
          user2: true,
        },
      });
      if (chat) {
        const pages = Math.floor(
          (await this.messagesRepository.count({
            where: {
              chat,
            },
          })) /
            20 +
            1,
        );
        if (page < 0) throw new ForbiddenException('Chat page must be greater than 0');
        if (page >= pages) throw new ForbiddenException(`Chat page must be less than or equal to ${pages - 1}`);
        const first = page * 20;
        const messages = await this.messagesRepository.find({
          where: {
            chat,
          },
          order: {
            date: 'DESC',
          },
          skip: first,
          take: 20,
          relations: {
            sender: true,
          },
        });
        return {
          id: chat.id,
          user: receiverUser,
          messages: await Promise.all(
            messages.map(async (message) => {
              return {
                id: message.id,
                date: message.date,
                sender: message.sender.id,
                message: message.message,
              };
            }),
          ),
          pages,
        };
      } else throw new ForbiddenException('Chat must exists');
    } else throw new ForbiddenException('Current User can not be the Receiving User');
  }

  async send(currentUser: User, receiver: number, message: MessageDto): Promise<ResponseChatDto> {
    const receiverUser = await this.usersService.findOne({ where: { id: receiver } });
    if (currentUser.id != receiverUser.id) {
      const chat = await this.chatsRepository.findOne({
        where: [
          { user1: currentUser, user2: receiverUser },
          { user2: currentUser, user1: receiverUser },
        ],
        relations: {
          user1: true,
          user2: true,
        },
      });
      if (chat) {
        await this.messagesRepository.save({
          chat,
          sender: currentUser,
          message: message.message,
        });
        //Aquí enviar la notificación
        return this.find(currentUser, receiver, 0);
      } else throw new ForbiddenException('Chat must exists');
    } else throw new ForbiddenException('Current User can not be the Receiving User');
  }
}
