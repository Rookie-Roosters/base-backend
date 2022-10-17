import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';
import { ResponseMessageDto } from './response-message.dto';

export class ResponseChatDto {
  @ApiProperty({
    type: Number,
    description: "Chat's primary key",
    required: false,
  })
  id: number;

  @ApiProperty({ type: User, description: 'User' })
  user: User;

  @ApiProperty({ type: [ResponseMessageDto] })
  messages: ResponseMessageDto[];

  @ApiProperty({type: Number, description: 'Number of Chat pages', required: false})
  pages?: number;
}
