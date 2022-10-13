import { AutomationConditionalAnd } from '@automation/blocks/conditionals/conditional-and';
import { AutomationConditionalIf } from '@automation/blocks/conditionals/conditional-if';
import { AutomationConditionalNot } from '@automation/blocks/conditionals/conditional-not';
import { AutomationConditionalOr } from '@automation/blocks/conditionals/conditional-or';
import { AutomationInputConstant } from '@automation/blocks/inputs/input-constant';

export type AutomationBoolTypes =
  | AutomationInputConstant
  | AutomationConditionalIf
  | AutomationConditionalAnd
  | AutomationConditionalOr
  | AutomationConditionalNot;
