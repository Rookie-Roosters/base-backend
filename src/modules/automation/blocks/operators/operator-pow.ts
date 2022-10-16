import { AutomationNumberTypes } from '@automation/types';

export interface AutomationOperatorPow {
  type: 'operatorPow';
  input1: AutomationNumberTypes;
  input2: AutomationNumberTypes;
  //output: number;
}
