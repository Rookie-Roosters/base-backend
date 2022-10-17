import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from '@notifications/notifications.module';
import { UsersModule } from '@users/users.module';
import { ChatsController } from './controllers/chats.controller';
import { Chat, Message } from './entities';
import { ChatsService } from './services/chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message]), UsersModule, NotificationsModule],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
