import { AutomationDateTypes } from '@automation/types';
import { AutomationNumberTypes } from '../../types/number.type';

export interface AutomationConditionalIf {
  type: 'conditionalIf';
  input1: AutomationNumberTypes | AutomationDateTypes;
  input2: AutomationNumberTypes | AutomationDateTypes;
  operator: string;
  //output: boolean;
}
