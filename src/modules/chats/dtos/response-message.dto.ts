import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';

export class ResponseMessageDto {
  @ApiProperty({ type: Number, description: "Message's primary key" })
  id: number;

  @ApiProperty({ type: Date, description: 'Date' })
  date: Date;

  @ApiProperty({ type: Number, description: 'User Sender id' })
  sender: Number;

  @ApiProperty({ type: String, description: 'Message', maxLength: 1024 })
  message: string;
}
