import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from './topic';

@Entity('answers')
export class Answer {
  @ApiProperty({ type: Number, description: "Answer's id" })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: Topic })
  @ManyToOne(() => Topic, (topic) => topic.id, { onDelete: 'CASCADE' })
  topic: Topic;

  @ApiProperty({ type: String, description: "Answer's text" })
  @Column({ type: String, length: 1028 })
  value: string;
}
