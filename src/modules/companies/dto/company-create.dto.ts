import { PickType } from '@nestjs/swagger';
import { Company } from '../entities';

export class CompanyCreateDto extends PickType(Company, ['rfc', 'name', 'icon'] as const) {}
