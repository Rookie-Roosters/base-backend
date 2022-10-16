import { Automation } from '@automation/blocks';
import { ApiProperty } from '@nestjs/swagger';

export class AutomationResponseDto {
  @ApiProperty({ type: Number, description: 'Automation primary key' })
  id: number;

  @ApiProperty({ type: Number, description: 'Automation company' })
  company: number;

  @ApiProperty({ description: 'Automation' })
  automation: Automation;

  @ApiProperty({ type: Boolean, description: 'Is Automation a draft?' })
  draft: boolean;
}
