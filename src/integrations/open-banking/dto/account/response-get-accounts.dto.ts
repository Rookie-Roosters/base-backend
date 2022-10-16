import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { AliasAccountDto } from './alias-account.dto';

export class ResponseGetAccountsDto {
  @ApiProperty({ description: "The ID of the client's account" })
  @IsString()
  idAccount: string;
  @ApiProperty({ description: "The ID of the client's account's currency" })
  @IsString()
  idCurrency: string;
  @ApiProperty({ description: "The name of the client's account's currency" })
  @IsString()
  currencyName: string;
  @ApiProperty({ description: "The client's ID" })
  @IsNumber()
  idClient: 0;
  @ApiProperty({ description: "The business unit's ID" })
  @IsNumber()
  idBusinessUnit: 0;
  @ApiProperty({ description: "The account's balance" })
  @IsNumber()
  balance: 0;
  @ApiProperty({ description: "The ID of the account's type" })
  @IsNumber()
  idAccountType: 0;
  @ApiProperty({ description: "The account's type description" })
  @IsString()
  accountTypeDescription: string;
  @ApiProperty({ description: "The account's deferred deposit" })
  @IsNumber()
  deferredDeposit: 0;
  @ApiProperty({ description: 'The alias account' })
  aliasAccount: AliasAccountDto;
}
