import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Topic {
  @ApiProperty({ type: Number, description: 'Chatbot topic id' })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: String, description: 'Chatbot topic', minLength: 1, maxLength: 64 })
  @Column({ type: String, length: 64 })
  topic: string;
}
