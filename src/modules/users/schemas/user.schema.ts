import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ type: String, description: "User's primary key" })
  _id?: string;

  @ApiProperty({ type: Number })
  __v?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
