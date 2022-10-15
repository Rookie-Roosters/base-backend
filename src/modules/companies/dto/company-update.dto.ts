import { PartialType, PickType } from '@nestjs/swagger';
import { Company } from '../entities';

export class CompanyUpdateDto extends PartialType(PickType(Company, ['name', 'icon'] as const)) {}
