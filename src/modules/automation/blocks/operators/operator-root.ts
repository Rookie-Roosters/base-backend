import { AutomationNumberTypes } from '@automation/types';

export interface AutomationOperatorRoot {
  type: 'operatorRoot';
  input1: AutomationNumberTypes;
  input2: AutomationNumberTypes;
  //output: number;
}
