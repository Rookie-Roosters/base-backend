import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MinLength, MaxLength } from "class-validator";

export class MessageDto {
    @ApiProperty({type: String, minLength: 1, maxLength: 1024, required: true})
    @IsDefined()
    @IsString()
    @MaxLength(1024)
    @MinLength(1)
    message: string;
}