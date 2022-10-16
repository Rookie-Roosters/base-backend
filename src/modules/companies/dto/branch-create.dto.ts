import { Branch } from '@companies/entities';
import { PickType } from '@nestjs/swagger';

export class BranchCreateDto extends PickType(Branch, ['location', 'name', 'phone', 'employees'] as const) {}
