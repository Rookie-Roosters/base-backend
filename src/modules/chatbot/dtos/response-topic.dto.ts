import { ApiProperty } from '@nestjs/swagger';
import { RequestTopicDto } from './request-topic.dto';

export class ResponseTopicDto extends RequestTopicDto {
  @ApiProperty({ type: Number, description: "ChatBot's primary key" })
  id: number;

  @ApiProperty({ type: [String], description: 'Questions' })
  questions: string[];

  @ApiProperty({ type: [String], description: 'Answers' })
  answers: string[];
}
