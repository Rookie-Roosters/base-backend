import { PipeTransform, Injectable, BadRequestException, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model, Document } from 'mongoose';

export function DocumentByIdParam<T = Document>(collectionName: string): ParameterDecorator {
  @Injectable()
  class DocumentByIdPipe implements PipeTransform<string, Promise<T>> {
    constructor(@InjectModel(collectionName) public readonly documentModel: Model<T>) {}
    async transform(value: string): Promise<T> {
      const isValid = isMongoId(value);
      if (!isValid) throw new BadRequestException('The provided Id must be a valid MongoId');
      const exists = await this.documentModel.findById(value);
      if (!exists) throw new NotFoundException('The provided Id does not exist');
      return exists;
    }
  }
  return Param('id', DocumentByIdPipe);
}
