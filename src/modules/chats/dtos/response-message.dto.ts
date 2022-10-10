import { ApiProperty } from '@nestjs/swagger';

export class ResponseMessageDto {
  @ApiProperty({
    type: String,
    description: "Message's primary key",
    required: false,
  })
  _id?: string;

  @ApiProperty({ type: Date, description: 'Date' })
  date: Date;

  @ApiProperty({ type: String, description: 'Sender' })
  sender: string;

  @ApiProperty({
    type: String,
    description: 'Message',
    minLength: 1,
    maxLength: 1024,
  })
  message: string;
}
