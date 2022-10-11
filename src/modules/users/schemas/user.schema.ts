import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User {
  @ApiProperty({ type: String, description: "User's primary key" })
  _id?: string;

  @ApiProperty({ type: Number })
  __v?: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
