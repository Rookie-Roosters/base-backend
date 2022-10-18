import { AuthRole } from '@authentication/constants';
import { CurrentAuth } from '@authentication/decorators';
import { ImplementedBanks } from '@banking/constants';
import {
  AccountsGetResponseDto,
  AuthenticationParamsDto,
  AuthenticationResponseDto,
  MovementsGetResponseDto,
  RecipientsGetResponseDto,
  TransferDoParamsDto,
  TransferDoResponseDto,
} from '@banking/dto';
import { BankingService } from '@companies/services/banking/banking.service';
import { API_ENDPOINTS, IHttpResponse } from '@core/constants';
import { ValidateIdPipe } from '@core/pipes/validate-id.pipe';
import { Body, Param, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiController, ApiDelete, ApiGet, ApiPost } from '@shared/decorators';
import { UseSessionGuard } from '@users/decorators';
import { User } from '@users/entities';
import { DeleteResult } from 'typeorm';

@ApiController(API_ENDPOINTS.COMPANIES.BANKING.BASE_PATH)
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  @ApiPost({
    path: API_ENDPOINTS.COMPANIES.BANKING.CREATE,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: AuthenticationResponseDto,
  })
  @ApiBody({ type: AuthenticationParamsDto })
  @ApiParam({ name: 'bank', enum: ImplementedBanks })
  @UseSessionGuard()
  async create(
    @Param('bank') bank: string,
    @CurrentAuth() currentUser: User,
    @Body() body: AuthenticationParamsDto,
  ): Promise<IHttpResponse<AuthenticationResponseDto>> {
    return {
      data: await this.bankingService.create(currentUser, bank, body),
    };
  }

  @ApiPost({
    path: API_ENDPOINTS.COMPANIES.BANKING.SIGN_IN,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: AuthenticationResponseDto,
  })
  @ApiBody({ type: AuthenticationParamsDto })
  @UseSessionGuard()
  async signIn(
    @Param('id') bank: number,
    @CurrentAuth() currentUser: User,
    @Body() body: AuthenticationParamsDto,
  ): Promise<IHttpResponse<AuthenticationResponseDto>> {
    return {
      data: await this.bankingService.signIn(currentUser, bank, body),
    };
  }

  @ApiGet({
    path: API_ENDPOINTS.COMPANIES.BANKING.EXPIRED,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: Boolean,
  })
  @UseSessionGuard()
  async expired(@Param('id') bank: number, @CurrentAuth() currentUser: User): Promise<IHttpResponse<boolean>> {
    return {
      data: await this.bankingService.expired(currentUser, bank),
    };
  }

  @ApiGet({
    path: API_ENDPOINTS.COMPANIES.BANKING.ACCOUNTS,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: Boolean,
  })
  @UseSessionGuard()
  async getAccounts(
    @Param('id') bank: number,
    @CurrentAuth() currentUser: User,
  ): Promise<IHttpResponse<AccountsGetResponseDto[]>> {
    return {
      data: await this.bankingService.getAccounts(currentUser, bank),
    };
  }

  @ApiGet({
    path: API_ENDPOINTS.COMPANIES.BANKING.MOVEMENTS,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: Boolean,
  })
  @ApiQuery({ name: 'startDate', type: Date })
  @ApiQuery({ name: 'endDate', type: Date })
  @ApiQuery({ name: 'account', type: String })
  @UseSessionGuard()
  async getMovements(
    @Param('id') bank: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('account') acount: string,
    @CurrentAuth() currentUser: User,
  ): Promise<IHttpResponse<MovementsGetResponseDto[]>> {
    return {
      data: await this.bankingService.getMovements(currentUser, bank, {
        StartDate: startDate,
        EndDate: endDate,
        Account: acount,
      }),
    };
  }

  @ApiGet({
    path: API_ENDPOINTS.COMPANIES.BANKING.RECIPIENTS,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: Boolean,
  })
  @ApiQuery({ name: 'recipientType', type: Number })
  @ApiQuery({ name: 'idCurrency', type: Number, required: false })
  @ApiQuery({ name: 'name', type: String, required: false })
  @UseSessionGuard()
  async getRecipients(
    @Param('id') bank: number,
    @Query('recipientType') recipientType: number,
    @Query('idCurrency') idCurrency: number | undefined = undefined,
    @Query('name') name: string | undefined,
    @CurrentAuth() currentUser: User,
  ): Promise<IHttpResponse<RecipientsGetResponseDto[]>> {
    return {
      data: await this.bankingService.getRecipients(currentUser, bank, {
        RecipientType: recipientType,
        idCurrency,
        Name: name,
      }),
    };
  }

  @ApiPost({
    path: API_ENDPOINTS.COMPANIES.BANKING.RECIPIENTS,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: Boolean,
  })
  @ApiBody({ type: TransferDoParamsDto })
  @UseSessionGuard()
  async doTransfer(
    @Param('id') bank: number,
    @Body() body: TransferDoParamsDto,
    @CurrentAuth() currentUser: User,
  ): Promise<IHttpResponse<TransferDoResponseDto>> {
    return {
      data: await this.bankingService.doTransfer(currentUser, bank, body),
    };
  }

  @ApiDelete({
    path: API_ENDPOINTS.COMPANIES.BY_ID,
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    responseType: AuthenticationResponseDto,
  })
  @ApiParam({ name: 'id', type: Number })
  @UseSessionGuard()
  async signOut(
    @Param('id', ValidateIdPipe) bank: number,
    @CurrentAuth() currentUser: User,
  ): Promise<IHttpResponse<DeleteResult>> {
    return {
      data: await this.bankingService.remove(currentUser, bank),
    };
  }
}
