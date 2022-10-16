import { Branch } from '@companies/entities';
import { PartialType, PickType } from '@nestjs/swagger';

export class BranchUpdateDto extends PartialType(PickType(Branch, ['name', 'location', 'phone'] as const)) {}
