import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ChatBotDocument = ChatBot & Document;

@Schema()
export class ChatBot {
  @ApiProperty({ type: String, description: "ChatBot's primary key" })
  _id?: string;

  @ApiProperty({
    type: String,
    description: 'Topic',
    minLength: 1,
    maxLength: 64,
  })
  @Prop({ type: String, minlength: 1, maxlength: 64 })
  topic: string;

  @ApiProperty({
    type: [String],
    description: 'Questions',
    minLength: 1,
    maxLength: 1024,
  })
  @Prop({
    type: [
      {
        type: String,
        minlength: 1,
        maxlength: 1024,
      },
    ],
  })
  questions: string[];

  @ApiProperty({
    type: [String],
    description: 'Answers',
    minLength: 1,
    maxLength: 1024,
  })
  @Prop({
    type: [
      {
        type: String,
        minlength: 1,
        maxlength: 1024,
      },
    ],
  })
  answers: string[];

  @ApiProperty({ type: Number })
  __v?: number;
}

export const ChatBotSchema = SchemaFactory.createForClass(ChatBot);
