import { PipeTransform, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Repository } from 'typeorm';

export function EntityByIdParam<T extends EntityClassOrSchema>(entity: T): ParameterDecorator {
  @Injectable()
  class EntityByIdPipe implements PipeTransform<number, Promise<T>> {
    constructor(
      @InjectRepository(entity)
      public readonly repository: Repository<T>,
    ) {}
    async transform(value: number): Promise<T> {
      const exists = await this.repository.findOneBy({ id: value } as any);
      if (!exists) throw new NotFoundException('The provided Id does not exist');
      return exists;
    }
  }
  return Param('id', EntityByIdPipe);
}
