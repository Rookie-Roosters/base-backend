import { AutomationInputConstant, AutomationInputVariable } from '@automation/blocks';
import {
  AutomationOperatorAdd,
  AutomationOperatorDiv,
  AutomationOperatorMul,
  AutomationOperatorSub,
} from '@automation/blocks/operators';

export type AutomationNumberTypes =
  | AutomationInputConstant
  | AutomationOperatorAdd
  | AutomationOperatorDiv
  | AutomationOperatorMul
  | AutomationOperatorSub
  | AutomationInputVariable;
