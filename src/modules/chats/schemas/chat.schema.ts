import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/schemas';
import mongoose, { Document } from 'mongoose';
import { Message, MessageSchema } from './message.schema';

export type ChatDocument = Chats & Document;
@Schema()
export class Chats {
  @ApiProperty({ type: String, description: "Chat's primary key" })
  _id?: string;

  @ApiProperty({ type: String, description: 'User 1' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user1: User;

  @ApiProperty({ type: String, description: 'User 2' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user2: User;

  @ApiProperty({ type: [Message], description: 'Messages' })
  @Prop({ type: [MessageSchema], required: true })
  messages: Message[];

  @ApiProperty({ type: Number })
  __v?: number;
}

export const ChatSchema = SchemaFactory.createForClass(Chats);
