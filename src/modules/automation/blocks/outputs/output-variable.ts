import { AutomationBoolTypes } from '../../types/bool.type';
import { AutomationNumberTypes } from '../../types/number.type';

export interface AutomationOutputVariable {
  type: 'outputVariable';
  name: string;
  input: AutomationNumberTypes | AutomationBoolTypes;
}
