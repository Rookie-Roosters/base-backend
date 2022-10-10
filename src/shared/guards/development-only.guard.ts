import { Injectable, CanActivate, NotFoundException } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { EnvironmentService } from 'src/core/services';

@Injectable()
export class DevelopmentOnlyGuard implements CanActivate {
  constructor(private readonly environmentService: EnvironmentService) {}

  canActivate(): boolean {
    if (this.environmentService.isDevelopment) return true;
    throw new NotFoundException('This method is only available in develpment environment');
  }
}
