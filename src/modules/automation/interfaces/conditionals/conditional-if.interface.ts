import { AutomationNumberTypes } from "../../types/number.type";

export enum AutomationConditionalIfOperators {
    '=',
    '!=',
    '<',
    '>',
    '<=',
    '>=',
}

export interface AutomationConditionalIfInterface {
    type: 'conditionalIf';
    input1: AutomationNumberTypes;
    input2: AutomationNumberTypes;
    operator: AutomationConditionalIfOperators;
    //output: boolean;
}