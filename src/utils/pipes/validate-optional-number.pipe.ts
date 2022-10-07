import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

export class ValidateOptionalNumberPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (value == undefined) return undefined;
    if(/\d+/.test(value as string)) return +value;
    throw new BadRequestException('Param or Query must be a Number');
  }
}
