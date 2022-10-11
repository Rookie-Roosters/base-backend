import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class AnswerDto {
  @ApiProperty({ type: String, minLength: 1, maxLength: 1024, default: '' })
  @IsDefined()
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  answer: string;
}
