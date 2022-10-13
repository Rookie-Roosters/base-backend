import { AutomationBoolTypes } from "@automation/types/bool.type";

export interface AutomationConditionalAnd {
    type: 'conditionalAnd';
    input1: AutomationBoolTypes,
    input2: AutomationBoolTypes,
    //output: boolean;
}