import { applyDecorators } from '@nestjs/common';

export interface ApiMethodDecoratorParams {
  summary?: string;
  description?: string;
}

// export function ApiMethodDecorator<>(params: ApiMethodDecoratorParams): MethodDecorator {
//   return applyDecorators([]);
// }
