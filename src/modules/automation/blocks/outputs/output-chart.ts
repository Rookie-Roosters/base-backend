import { AutomationActionInterface } from '@automation/interfaces/action.interface';
import { AutomationNumberTypes } from '@automation/types';

export interface AutomationOutputChart {
  type: 'outputChart';
  name: string;
  input: AutomationNumberTypes;
  actions: AutomationActionInterface[];
}
