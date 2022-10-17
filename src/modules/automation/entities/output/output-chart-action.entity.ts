import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AutomationOutputChartEntity } from './output-chart.entity';

@Entity('output_chart_action')
export class AutomationOutputChartActionEntity {
  @ApiProperty({ type: Number, description: 'Output Chart Action id' })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: AutomationOutputChartEntity })
  @ManyToOne(() => AutomationOutputChartEntity, (outputChart) => outputChart.id, { onDelete: 'CASCADE' })
  outputChart: AutomationOutputChartEntity;

  @ApiProperty({ type: String })
  @Column({ type: String, length: 64 })
  name: string;

  @ApiProperty({ type: String })
  @Column({ type: String, length: 256 })
  url: string;
}
