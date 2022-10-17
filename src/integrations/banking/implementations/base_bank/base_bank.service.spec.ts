import { Test, TestingModule } from '@nestjs/testing';
import { BaseBankService } from './base_bank.service';

describe('BaseBankService', () => {
  let service: BaseBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseBankService],
    }).compile();

    service = module.get<BaseBankService>(BaseBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
