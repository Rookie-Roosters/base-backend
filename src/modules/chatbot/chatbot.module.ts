import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic, Question, Answer } from '@chatbot/entities';
import { ChatbotController } from '@chatbot/controllers';
import { ChatbotService } from '@chatbot/services';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Question, Answer]), UsersModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
