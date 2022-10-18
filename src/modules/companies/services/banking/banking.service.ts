import { BankRepository } from '@banking/constants';
import { AuthenticationParamsDto, AuthenticationResponseDto } from '@banking/dto';
import { BaseBankService } from '@banking/implementations';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BankingService {
  constructor(private readonly baseBankService: BaseBankService, private readonly jwtService: JwtService) {}

  private bankService(bankName: string): BankRepository {
    switch (bankName) {
      case this.baseBankService.name:
        return this.baseBankService;
      default:
        throw new ForbiddenException('Invalid bank name');
    }
  }

  async signIn(bank: string, params: AuthenticationParamsDto): Promise<AuthenticationResponseDto> {
    // const authentication = await this.bankService(bank).signIn(params);
    // if(authentication.jwt) {
        console.log(params);
        console.log(this.jwtService.sign(params));
        return await this.bankService(bank).signIn(params);
    // } else throw new ForbiddenException('Something went wrong');
    return null;
  }
}
