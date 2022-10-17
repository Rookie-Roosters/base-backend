import { AuthRole } from '@authentication/constants';
import { BankRepository, ImplementedBanks } from '@banking/constants';
import { AuthenticationParamsDto, AuthenticationResponseDto } from '@banking/dto';
import { BaseBankService } from '@banking/implementations';
import { API_ENDPOINTS, IHttpResponse } from '@core/constants';
import { Body, Controller, ForbiddenException, Param } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiController, ApiPost } from '@shared/decorators';

@ApiController(API_ENDPOINTS.COMPANIES.BANKING.BASE_PATH)
export class BankingController {
  constructor(private readonly baseBankService: BaseBankService) {}

  @ApiPost({
    path: API_ENDPOINTS.COMPANIES.BANKING.SIGN_IN,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: AuthenticationResponseDto,
  })
  @ApiBody({ type: AuthenticationParamsDto })
  @ApiParam({ name: 'bank', enum: ImplementedBanks })
  async signIn(
    @Param('bank') bank: string,
    @Body() body: AuthenticationParamsDto,
  ): Promise<IHttpResponse<AuthenticationResponseDto>> {
    const data = await this.bankService(bank).signIn(body);
    return { data };
  }

  private bankService(bankName: string): BankRepository {
    switch (bankName) {
      case this.baseBankService.name:
        return this.baseBankService;
      default:
        throw new ForbiddenException('Invalid bank name');
    }
  }
}
