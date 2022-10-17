import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AutomationOutputChartEntity } from './output-chart.entity';

@Entity('output_chart_values')
export class AutomationOutputChartValueEntity {
  @ApiProperty({ type: Number, description: 'Output Chart Values id' })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: AutomationOutputChartEntity })
  @ManyToOne(() => AutomationOutputChartEntity, (outputChart) => outputChart.id, { onDelete: 'CASCADE' })
  outputChart: AutomationOutputChartEntity;

  @ApiProperty({ type: Number })
  @Column({ type: Number })
  value: number;

  @ApiProperty({ type: Date })
  @CreateDateColumn()
  date: Date;
}
