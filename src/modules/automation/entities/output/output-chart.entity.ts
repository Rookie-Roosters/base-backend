import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AutomationEntity } from '../automation.entity';

@Entity('output_chart')
export class AutomationOutputChartEntity {
  @ApiProperty({ type: Number, description: 'Output Chart id' })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: AutomationEntity })
  @ManyToOne(() => AutomationEntity, (automation) => automation.id, { onDelete: 'CASCADE' })
  automation: AutomationEntity;

  @ApiProperty({ type: String })
  @Column({ type: String, length: 64 })
  name: string;
}
