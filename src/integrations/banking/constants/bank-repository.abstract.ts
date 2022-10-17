import {
  AccountsGetResponseDto,
  AccountValidateParamsDto,
  AccountValidateResponseDto,
  AuthenticationParamsDto,
  AuthenticationResponseDto,
  MovementsGetParamsDto,
  MovementsGetResponseDto,
  RecipientsGetParamsDto,
  RecipientsGetResponseDto,
  TransferDoParamsDto,
  TransferDoResponseDto,
} from '@banking/dto';

export abstract class BankRepository {
  constructor(public readonly name: string, public readonly apiKey: string, public readonly apiUrl: string) {}

  abstract signIn(params: AuthenticationParamsDto): Promise<AuthenticationResponseDto>;

  abstract validateAccount(params: AccountValidateParamsDto): Promise<AccountValidateResponseDto>;

  abstract signOut(params: AuthenticationParamsDto, authToken: string): Promise<boolean>;

  abstract refreshToken(params: AuthenticationParamsDto, authToken: string): Promise<AuthenticationResponseDto>;

  abstract doTransfer(params: TransferDoParamsDto, authToken: string): Promise<TransferDoResponseDto>;

  abstract getAccounts(authToken: string): Promise<AccountsGetResponseDto[]>;

  abstract getMovements(params: MovementsGetParamsDto, authToken: string): Promise<MovementsGetResponseDto[]>;

  abstract getRecipients(params: RecipientsGetParamsDto, authToken: string): Promise<RecipientsGetResponseDto[]>;
}
