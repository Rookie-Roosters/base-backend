import { ApiProperty } from '@nestjs/swagger';
import { ErrorPropDto } from './error-prop.dto';
import { IsDefined, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ResponseError400Dto {
  @ApiProperty({ description: "The error's failures" })
  failures: ErrorPropDto;
  @ApiProperty({ description: "The error's stack trace" })
  @IsString()
  stackTrace: string;
  @ApiProperty({ description: "The error's message" })
  @IsString()
  message: string;
  @ApiProperty({ description: "The error's data" })
  data: ErrorPropDto;
  @ApiProperty({ description: "The error's inner exceptions" })
  innerException: {};
  @ApiProperty({ description: "The error's help link" })
  @IsString()
  helpLink: string;
  @ApiProperty({ description: "The error's source" })
  @IsString()
  source: string;
  @ApiProperty({ description: "The error's hresult code" })
  @IsNumber()
  hResult: 0;
}
