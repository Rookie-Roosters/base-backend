import { ApiProperty } from '@nestjs/swagger';
import { AutomationOutputTypes } from '../types/output.type';

export interface Automation {
  output: AutomationOutputTypes;
}
