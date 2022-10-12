import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class AliasAccountDto {
    @ApiProperty({ description: "The alias account's ID" })
    @IsString()
    idAccount: string;
    @ApiProperty({ description: "The alias account's name" })
    @IsString()
    aliasName: string;
    @ApiProperty({ description: "The client's ID" })
    @IsNumber()
    idClient: 0;
    @ApiProperty({ description: "The business unit's ID" })
    @IsNumber()
    idBusinessUnit: 0;
    @ApiProperty({ description: "The alias account's creation date" })
    @IsDateString()
    creationDate: "2022-08-24T14:50:38.679Z";
    @ApiProperty({ description: "The alias account's modification date" })
    @IsDateString()
    modificationDate: "2022-08-24T14:50:38.679Z";
}