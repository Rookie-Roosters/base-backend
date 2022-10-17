import { ApiProperty } from '@nestjs/swagger';

export class AccountValidateParamsDto {
  @ApiProperty()
  userName: string;
}
