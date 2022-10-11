import { ChatbotService } from '@chatbotservices/chatbot.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotController } from './chatbot.controller';

describe('ChatBotController', () => {
  let controller: ChatbotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatbotController],
      providers: [ChatbotService],
    }).compile();

    controller = module.get<ChatbotController>(ChatbotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
