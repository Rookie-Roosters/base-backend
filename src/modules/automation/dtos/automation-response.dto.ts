import { Automation } from "@automation/blocks";
import { ApiProperty } from "@nestjs/swagger";

export class AutomationResponseDto {
    @ApiProperty({type: Number})
    id: number;

    @ApiProperty({type: Number})
    company: number;

    @ApiProperty()
    automation: Automation;
}