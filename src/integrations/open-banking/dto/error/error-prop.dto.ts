import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ErrorPropDto {
  @ApiProperty({ description: 'First additional prop' })
  additionalProp1: {};
  @ApiProperty({ description: 'Second additional prop' })
  additionalProp2: {};
  @ApiProperty({ description: 'Third additional prop' })
  additionalProp3: {};
}
