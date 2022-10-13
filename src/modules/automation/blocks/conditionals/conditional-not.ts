import { AutomationBoolTypes } from "@automation/types/bool.type";

export interface AutomationConditionalNot {
    type: 'conditionalAnd',
    input: AutomationBoolTypes,
    //output: boolean;
}