import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatBotController } from './controllers/chat-bot.controller';
import { ChatBot, ChatBotSchema } from './schemas/chatbot.schema';
import { ChatBotService } from './services/chat-bot.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatBot.name, schema: ChatBotSchema }]),
  ],
  controllers: [ChatBotController],
  providers: [ChatBotService],
  exports: [ChatBotService],
})
export class ChatBotModule {}
