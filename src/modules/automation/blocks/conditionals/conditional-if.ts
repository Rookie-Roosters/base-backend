import { AutomationNumberTypes } from '../../types/number.type';

export enum AutomationConditionalIfOperators {
  '=',
  '!=',
  '<',
  '>',
  '<=',
  '>=',
}

export interface AutomationConditionalIf {
  type: 'conditionalIf';
  input1: AutomationNumberTypes;
  input2: AutomationNumberTypes;
  operator: string;
  //output: boolean;
}
