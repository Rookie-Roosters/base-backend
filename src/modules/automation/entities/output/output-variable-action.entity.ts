import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AutomationOutputVariableEntity } from './output-variable.entity';

@Entity('output_variable_action')
export class AutomationOutputVariableActionEntity {
  @ApiProperty({ type: Number, description: 'Output Variable Action id' })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: AutomationOutputVariableEntity })
  @ManyToOne(() => AutomationOutputVariableEntity, (outputVariable) => outputVariable.id, { onDelete: 'CASCADE' })
  outputVariable: AutomationOutputVariableEntity;

  @ApiProperty({ type: String })
  @Column({ type: String, length: 64 })
  name: string;

  @ApiProperty({ type: String })
  @Column({ type: String, length: 256 })
  url: string;
}
