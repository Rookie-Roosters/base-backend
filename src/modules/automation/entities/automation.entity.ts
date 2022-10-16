import { Company } from '@companies/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AutomationOutputVariableActionEntity } from './output';

@Entity('automation')
export class AutomationEntity {
  @ApiProperty({ type: Number, description: "Automation's id" })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({type: Company})
  @ManyToOne(() => Company, (company) => company.id, {onDelete: 'CASCADE'})
  company: Company; //Change this when we hava a company entity

  @ApiProperty({ type: String, description: 'Automation json filename' })
  @Column({ type: String, length: 64 })
  filename: string;

  @ApiProperty({ type: String, description: 'Is Automation a draft?', default: false })
  @Column({ type: Boolean, default: false })
  draft: boolean;
}
