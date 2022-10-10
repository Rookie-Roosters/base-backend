import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsController } from './controllers/chats.controller';
import { Chats, ChatSchema } from './schemas/chat.schema';
import { ChatsService } from './services/chats.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chats.name, schema: ChatSchema }])],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
