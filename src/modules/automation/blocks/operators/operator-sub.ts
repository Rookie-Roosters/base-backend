import { AutomationNumberTypes } from '@automation/types';

export interface AutomationOperatorSub {
  type: 'operatorSub';
  input1: AutomationNumberTypes;
  input2: AutomationNumberTypes;
  //output: number;
}
