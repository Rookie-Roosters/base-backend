import { ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';

export class ValidateNumberPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    if(value == undefined) return undefined; 
    if (/^\d+/i.test(value as string)) {
      return +value;
    } else {
      throw new BadRequestException('value must be a Number');
    }
  }
}
