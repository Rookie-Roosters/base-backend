import { AutomationActionInterface } from '@automation/interfaces/action.interface';
import { AutomationBoolTypes, AutomationDateTypes, AutomationNumberTypes } from '@automation/types';

export interface AutomationOutputNotification {
  type: 'outputNotification';
  title: string;
  text: string;
  url: string;
  input: AutomationBoolTypes;
  actions: AutomationActionInterface[];
}
