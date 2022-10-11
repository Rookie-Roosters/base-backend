import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsController } from './controllers';
import { Chats, ChatSchema } from './schemas';
import { ChatsService } from './services';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chats.name, schema: ChatSchema }])],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
