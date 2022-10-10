import { Environment } from '@core/constants';
import { EnvironmentService } from '@core/services';
import { applyDecorators, CanActivate, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

export function DevelopmentOnly(): MethodDecorator {
  @Injectable()
  class DevelopmentOnlyGuard implements CanActivate {
    constructor(private readonly environmentService: EnvironmentService) {}
    canActivate(): boolean {
      if (this.environmentService.isDevelopment) return true;
      throw new NotFoundException('This method is only available in develpment environment');
    }
  }

  return applyDecorators(
    UseGuards(DevelopmentOnlyGuard),
    process.env.NODE_ENV != Environment.DEVELOPMENT ? ApiExcludeEndpoint() : null,
  ) as MethodDecorator;
}
