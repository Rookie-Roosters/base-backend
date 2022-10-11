import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@users/dtos';
import { ResponseMessageDto } from './response-message.dto';

export class ResponseChatDto {
  @ApiProperty({
    type: String,
    description: "Chat's primary key",
    required: false,
  })
  _id?: string;

  @ApiProperty({ type: String, description: 'User' })
  user: UserDto;

  @ApiProperty({ type: [ResponseMessageDto], description: 'Messages' })
  messages: ResponseMessageDto[];
}
