import { Test, TestingModule } from '@nestjs/testing';
import { ChatBotService } from '../services/chat-bot.service';
import { ChatBotController } from './chat-bot.controller';

describe('ChatBotController', () => {
  let controller: ChatBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatBotController],
      providers: [ChatBotService],
    }).compile();

    controller = module.get<ChatBotController>(ChatBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
