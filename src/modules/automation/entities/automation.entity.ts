import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('automation')
export class AutomationEntity {
  @ApiProperty({ type: Number, description: "Automation's id" })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: Number, description: 'Automation company' })
  @Column({ type: Number })
  company: number; //Change this when we hava a company entity

  @ApiProperty({ type: String, description: 'Automation json filename' })
  @Column({ type: String, length: 64 })
  filename: string;

  @ApiProperty({ type: String, description: 'Is Automation a draft?', default: false })
  @Column({ type: Boolean, default: false })
  draft: boolean;
}
