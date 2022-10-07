import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

export class ValidateIdPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type == 'query' && value == null) return null;
    if (/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(value as string)) {
      return value;
    } else {
      throw new BadRequestException('_id must be a MongoDB _id');
    }
  }
}
