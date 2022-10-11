import { ApiProperty } from '@nestjs/swagger';
import { RequestTopicDto } from './request-topic.dto';

export class ResponseTopicDto extends RequestTopicDto {
  @ApiProperty({ type: String, description: "ChatBot's primary key" })
  _id: string;

  @ApiProperty({ type: [String], description: 'Questions' })
  questions: string[];

  @ApiProperty({ type: [String], description: 'Answers' })
  answers: string[];
}
