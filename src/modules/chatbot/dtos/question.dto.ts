import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class QuestionDto {
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 1024,
    default: '',
    description: 'Must not contain special characters',
  })
  @IsDefined()
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  @Matches(/^[a-zA-Z ]+$/)
  question: string;
}
