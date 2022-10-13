import { AutomationNumberTypes } from '../../types/number.type';

export interface AutomationConditionalIf {
  type: 'conditionalIf';
  input1: AutomationNumberTypes;
  input2: AutomationNumberTypes;
  operator: string;
  //output: boolean;
}
