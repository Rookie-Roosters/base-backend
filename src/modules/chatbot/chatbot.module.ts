import { ChatbotController } from '@chatbotcontrollers/chatbot.controller';
import { Answer } from '@chatbotentities/answer.entity';
import { Question } from '@chatbotentities/question.entity';
import { Topic } from '@chatbotentities/topic';
import { ChatbotService } from '@chatbotservices/chatbot.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Question, Answer])],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
