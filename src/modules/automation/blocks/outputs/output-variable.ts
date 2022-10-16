import { AutomationActionInterface } from "@automation/interfaces/action.interface";
import { AutomationBoolTypes, AutomationNumberTypes } from "@automation/types";

export interface AutomationOutputVariable {
  type: 'outputVariable';
  name: string;
  input: AutomationNumberTypes | AutomationBoolTypes;
  actions: AutomationActionInterface[];
}
