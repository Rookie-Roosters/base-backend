import { ApiProperty } from '@nestjs/swagger';

export class TransferDoParamsDto {
  @ApiProperty()
  externalTrackingId: string;

  @ApiProperty()
  operationKey: string;

  @ApiProperty()
  dynamicKey: string;

  @ApiProperty()
  originAccount: string;

  @ApiProperty()
  recipientId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  conceptReference: string;

  @ApiProperty()
  numericReference: string;

  @ApiProperty()
  ipAddress: string;
}
