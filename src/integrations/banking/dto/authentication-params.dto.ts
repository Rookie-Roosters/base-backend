import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationParamsDto {
  @ApiProperty()
  account: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  token: number;
}
