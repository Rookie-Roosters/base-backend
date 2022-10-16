import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ResponseError401Dto {
  @ApiProperty({ description: "The error's type" })
  @IsString()
  type: string;
  @ApiProperty({ description: "The error's title" })
  @IsString()
  title: string;
  @ApiProperty({ description: "The error's status" })
  @IsNumber()
  status: 0;
  @ApiProperty({ description: "The error's detailed description" })
  @IsString()
  detail: string;
  @ApiProperty({ description: "The error's instance" })
  @IsString()
  instance: string;
}
