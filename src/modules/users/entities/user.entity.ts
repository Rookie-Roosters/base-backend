import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  firstName: string;
}
