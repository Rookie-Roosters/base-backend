import { AutomationNumberTypes } from '../../types/number.type';

export interface AutomationOutputVariableInterface {
  type: 'outputVariable';
  name: string;
  input: AutomationNumberTypes | AutomationOutputVariableInterface;
}
