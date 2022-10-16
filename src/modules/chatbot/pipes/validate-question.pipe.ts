import { ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';

export class ValidateQuestionPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    if ((value as string).length < 1)
      throw new BadRequestException('The length of the question must be greater than or equal to 1');
    else if ((value as string).length > 1023)
      throw new BadRequestException('The length of the question must be less than 1024');
    else return value;
  }
}
