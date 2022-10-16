import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ResponseGetRecipientsDto {
  @ApiProperty({ description: 'The ID of the recipient' })
  @IsString()
  idRecipient: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  @ApiProperty({ description: "The recipient's full name" })
  @IsString()
  fullName: string;
  @ApiProperty({ description: "The ID of the recipient's currency" })
  @IsString()
  idCurrency: string;
  @ApiProperty({ description: "The recipient's account" })
  @IsString()
  account: string;
  @ApiProperty({ description: "The bank's name" })
  @IsString()
  bankName: string;
  @ApiProperty({ description: "The recipient's RFC and CURP" })
  @IsString()
  rfcCurp: string;
  @ApiProperty({ description: "The recipient's country" })
  @IsString()
  country: string;
  @ApiProperty({ description: "The recipient's bank square" })
  @IsString()
  recipientBankSquare: string;
  @ApiProperty({ description: "The recipient's bank code" })
  @IsString()
  recipientBankCode: string;
  @ApiProperty({ description: "The recipient's bank's type account" })
  @IsString()
  recipientBankTypeAccount: string;
  @ApiProperty({ description: "The recipient's bank's name" })
  @IsString()
  recipientBankName: string;
  @ApiProperty({ description: "The type code of the recipient's bank's name" })
  @IsString()
  recipientBankNameTypeCode: string;
  @ApiProperty({ description: "The intermediary's bank name" })
  @IsString()
  intermediaryBankName: string;
}
