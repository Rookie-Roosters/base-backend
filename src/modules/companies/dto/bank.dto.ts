import { ApiParam, ApiProperty } from "@nestjs/swagger";

export class BankDto {
    @ApiProperty({type: Number, description: "Bank's id"})
    id: number;

    @ApiProperty({type: String, description: 'Bank name'})
    bankName: String;
}