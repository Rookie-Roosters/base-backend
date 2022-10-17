import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @ApiProperty({ description: "Message's primay key" })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: Chat, description: 'Message chat' })
  @ManyToOne(() => Chat, (chat) => chat.id, { onDelete: 'CASCADE' })
  chat: Chat;

  @ApiProperty({ type: User, description: 'Message sender' })
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  sender: User;

  @ApiProperty({ type: Date, description: 'Message date' })
  @CreateDateColumn()
  date: Date;

  @ApiProperty({ type: String, description: 'Message text' })
  @Column({ type: String, length: 1024 })
  message: string;
}
