import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsDefined, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { MovementDetailDto } from './movement-detail.dto';

export class ResponseGetMovementsDto {
  @ApiProperty({ description: "The folio's ID" })
  @IsNumber()
  idFolio: 0;
  @ApiProperty({ description: "The movement's concept" })
  @IsString()
  concept: string;
  @ApiProperty({ description: "The ID of the client's account" })
  @IsString()
  idAccount: string;
  @ApiProperty({ description: "The client's ID" })
  @IsNumber()
  idClient: 0;
  @ApiProperty({ description: "The business unit's ID" })
  @IsNumber()
  idBusinessUnit: 0;
  @ApiProperty({ description: 'Cargo' })
  @IsBoolean()
  isCargo: true;
  @ApiProperty({ description: "The movement's date" })
  @IsDateString()
  date: '2022-08-24T14:54:05.491Z';
  @ApiProperty({ description: "The movement's amount" })
  @IsNumber()
  amount: 0;
  @ApiProperty({ description: "The account's balance" })
  @IsNumber()
  balance: 0;
  @ApiProperty({ description: "The movement's type" })
  @IsNumber()
  movementType: 0;
  @ApiProperty({ description: "The status's ID" })
  @IsNumber()
  idStatus: 0;
  @ApiProperty({ description: 'The deferred deposit' })
  @IsString()
  deferredDeposit: string;
  @ApiProperty({ description: "The movement's notes" })
  @IsString()
  notes: string;
  @ApiProperty({ description: "The bank's name" })
  @IsString()
  bankName: string;
  @ApiProperty({ description: "The movement's short currency" })
  @IsString()
  shortCurrency: string;
  @ApiProperty({ description: "The sender's name" })
  @IsString()
  senderName: string;
  @ApiProperty({ description: "The movement's folio signature" })
  @IsNumber()
  folioSignature: 0;
  movementDetail: MovementDetailDto;
}
