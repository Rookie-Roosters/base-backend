import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ResponseRefreshTokenDto {
  @ApiProperty({ description: "Logged user's name" })
  @IsString()
  name: string;
  @ApiProperty({ description: "Logged user's username" })
  @IsString()
  userName: string;
  @ApiProperty({ description: "Logged user's first last name" })
  @IsString()
  firstLastName: string;
  @ApiProperty({ description: "Logged user's second last name" })
  @IsString()
  secondLastName: string;
  @ApiProperty({ description: "Logged user's e-mail" })
  @IsString()
  email: string;
  @ApiProperty({ description: "Logged user's Company name" })
  @IsString()
  companyName: string;
  @ApiProperty({ description: "Logged user's RFC" })
  @IsString()
  rfc: string;
  @ApiProperty({ description: "Logged user's Unique Client ID" })
  @IsNumber()
  idClientUnique: 0;
  @ApiProperty({ description: "Logged user's Group ID" })
  @IsNumber()
  idGroup: 0;
  @ApiProperty({ description: "Logged user's token" })
  @IsString()
  jwt: string;
  @ApiProperty({ description: "Logged user's token's expired time" })
  @IsNumber()
  jwtExpiredTime: 0;
  @ApiProperty({ description: "Logged user's token refresh" })
  @IsString()
  jwtRefresh: string;
}
