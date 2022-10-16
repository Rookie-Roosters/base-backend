import { AutomationNumberTypes } from '@automation/types';

export interface AutomationOperatorAdd {
  type: 'operatorAdd';
  input1: AutomationNumberTypes;
  input2: AutomationNumberTypes;
  //output: number;
}
