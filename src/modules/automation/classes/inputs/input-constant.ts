import { ApiProperty } from "@nestjs/swagger";

export interface AutomationInputConstant {
  type: 'inputConstant';
  value: boolean | number;
  //output: Number | Boolean;
}
