import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@users/dtos';

export class ResponseShortChatDto {
  @ApiProperty({
    type: String,
    description: "Chat's primary key",
    required: false,
  })
  _id?: string;

  @ApiProperty({ type: String, description: 'User' })
  user: UserDto;

  @ApiProperty({ type: String, description: 'Last message' })
  lastMessage: string;
}
