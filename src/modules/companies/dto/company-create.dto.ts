import { ApiProduces, ApiProperty, PickType } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';
import { Company } from '../entities';

export class CompanyCreateDto {
    @ApiProperty()
    @IsDefined()
    @MinLength(1)
    @IsString()
    name: string;

    @ApiProperty()
    @IsDefined()
    @MinLength(13)
    @MaxLength(13)
    @IsString()
    rfc: string;
}
