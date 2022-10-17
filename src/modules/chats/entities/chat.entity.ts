import { Topic } from '@chatbotentities';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @ApiProperty({ description: "Chat's primary key" })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: User, description: 'User 1' })
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user1: User;

  @ApiProperty({ type: User, description: 'User 2' })
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user2: User;
}
