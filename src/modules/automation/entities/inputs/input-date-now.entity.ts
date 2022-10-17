import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AutomationEntity } from '../automation.entity';

@Entity('input_date_now')
export class AutomationInputDateNowEntity {
  @ApiProperty({ type: Number, description: 'Input Date Now id' })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: AutomationEntity })
  @ManyToOne(() => AutomationEntity, (automation) => automation.id, { onDelete: 'CASCADE' })
  automation: AutomationEntity;
}
