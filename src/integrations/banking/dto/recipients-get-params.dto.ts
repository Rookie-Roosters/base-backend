import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecipientsGetParamsDto {
  @ApiProperty()
  RecipientType: number;

  @ApiPropertyOptional()
  idCurrency?: number;

  @ApiPropertyOptional()
  Name?: string;
}
