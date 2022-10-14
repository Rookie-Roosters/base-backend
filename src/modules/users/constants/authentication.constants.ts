import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';

export class AuthTokenResponse {
  @ApiProperty()
  user: User;
  @ApiProperty()
  authToken: string;
}

export interface IDecodedToken {
  userId: number;
  identifier: string;
}
