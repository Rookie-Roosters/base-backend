import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';
import { User } from '@users/entities';

export class UserUpdateDto extends PartialType(PickType(User, ['firstName', 'lastName', 'isActive'] as const)) {}
