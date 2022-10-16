import { AutomationNumberTypes } from '@automation/types';

export interface AutomationOperatorMul {
  type: 'operatorMul';
  input1: AutomationNumberTypes;
  input2: AutomationNumberTypes;
  //output: number;
}
