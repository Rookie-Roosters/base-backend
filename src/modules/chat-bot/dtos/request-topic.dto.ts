import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RequestTopicDto {
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 64,
    description:
      'Must not contain spaces or special characters, but may contain dots to differentiate the topic',
    default: 'saludo.bienvenida',
  })
  @IsDefined()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @Matches(/^[a-zA-Z.]+$/)
  topic: string;
}
