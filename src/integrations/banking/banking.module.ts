import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BaseBankService } from './implementations';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [BaseBankService],
  exports: [BaseBankService],
})
export class BankingModule {}
