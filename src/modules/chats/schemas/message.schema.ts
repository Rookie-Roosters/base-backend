import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type MessageDocument = Message & Document;
@Schema()
export class Message {
  @ApiProperty({ type: String, description: "Message's primary key" })
  _id?: string;

  @ApiProperty({ type: String, description: 'Sender' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender: string;

  @ApiProperty({ type: Date, description: 'Date' })
  @Prop({ type: Date, required: true })
  date: Date;

  @ApiProperty({
    type: String,
    description: 'Message',
    minLength: 1,
    maxLength: 1024,
  })
  @Prop({ type: String, required: true, max: 1024, min: 1 })
  message: string;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
