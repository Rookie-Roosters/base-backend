import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class AliasAccountDto {
  @ApiProperty({ description: "The alias account's ID" })
  @IsString()
  idAccount: string;
  @ApiProperty({ description: "The alias account's name" })
  @IsString()
  aliasName: string;
  @ApiProperty({ description: "The client's ID" })
  @IsNumber()
  idClient: 0;
  @ApiProperty({ description: "The business unit's ID" })
  @IsNumber()
  idBusinessUnit: 0;
  @ApiProperty({ description: "The alias account's creation date" })
  @IsDateString()
  creationDate: '2022-08-24T14:50:38.679Z';
  @ApiProperty({ description: "The alias account's modification date" })
  @IsDateString()
  modificationDate: '2022-08-24T14:50:38.679Z';
}

export class AccountsGetResponseDto {
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
