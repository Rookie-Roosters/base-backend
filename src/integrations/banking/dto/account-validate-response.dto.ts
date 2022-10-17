import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class AccountValidateResponseDto {
  @ApiProperty({ description: "User's full name" })
  @IsString()
  fullName: string;
  @ApiProperty({ description: "User's ID status" })
  @IsNumber()
  idStatus: 0;
  @ApiProperty({ description: "User's role" })
  @IsString()
  roleName: string;
  @ApiProperty({ description: "User's status" })
  @IsBoolean()
  isBasic: true;
  @ApiProperty({ description: "User's phrase" })
  @IsString()
  phrase: string;
  @ApiProperty({ description: "User's image path" })
  @IsString()
  imagePath: string;
}
