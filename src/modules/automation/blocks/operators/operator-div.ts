import { AutomationNumberTypes } from '@automation/types';

export interface AutomationOperatorDiv {
  type: 'operatorDiv';
  input1: AutomationNumberTypes;
  input2: AutomationNumberTypes;
  //output: number;
}
