import { BankRepository, ImplementedBanks } from '@banking/constants';
import {
  AuthenticationParamsDto,
  AuthenticationResponseDto,
  AccountValidateParamsDto,
  AccountValidateResponseDto,
  TransferDoParamsDto,
  TransferDoResponseDto,
  AccountsGetResponseDto,
  MovementsGetParamsDto,
  MovementsGetResponseDto,
  RecipientsGetParamsDto,
  RecipientsGetResponseDto,
} from '@banking/dto';
import { EnvironmentService } from '@core/services';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseBankService extends BankRepository {
  constructor(private readonly environmentService: EnvironmentService, private readonly httpService: HttpService) {
    super(ImplementedBanks.BASE, environmentService.get('BASE_API_KEY'), environmentService.get('BASE_API_URL'));
  }

  async signIn(params: AuthenticationParamsDto): Promise<AuthenticationResponseDto> {
    const { data } = await this.httpService.axiosRef.post(`${this.apiUrl}Login/SignIn`, params, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
    });
    return data as AuthenticationResponseDto;
  }

  async validateAccount(params: AccountValidateParamsDto): Promise<AccountValidateResponseDto> {
    const { data } = await this.httpService.axiosRef.post(`${this.apiUrl}Login/ValidateAccount`, params, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
    });
    return data as AccountValidateResponseDto;
  }

  async signOut(params: AuthenticationParamsDto, authToken: string): Promise<boolean> {
    const { data } = await this.httpService.axiosRef.post(`${this.apiUrl}Login/ValidateAccount`, params, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return data as boolean;
  }

  async refreshToken(params: AuthenticationParamsDto, authToken: string): Promise<AuthenticationResponseDto> {
    const { data } = await this.httpService.axiosRef.post(`${this.apiUrl}Users/RefreshToken`, params, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return data as AuthenticationResponseDto;
  }

  async doTransfer(params: TransferDoParamsDto, authToken: string): Promise<TransferDoResponseDto> {
    const { data } = await this.httpService.axiosRef.post(`${this.apiUrl}Users/DoTransferFX`, params, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return data as TransferDoResponseDto;
  }

  async getAccounts(authToken: string): Promise<AccountsGetResponseDto[]> {
    const { data } = await this.httpService.axiosRef.post(`${this.apiUrl}Accounts/GetAccounts`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return data as AccountsGetResponseDto[];
  }

  async getMovements(params: MovementsGetParamsDto, authToken: string): Promise<MovementsGetResponseDto[]> {
    throw new Error('Method not implemented.');
  }

  getRecipients(params: RecipientsGetParamsDto, authToken: string): Promise<RecipientsGetResponseDto[]> {
    throw new Error('Method not implemented.');
  }
}
