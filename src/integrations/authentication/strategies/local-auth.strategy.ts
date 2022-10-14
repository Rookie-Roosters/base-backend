import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '@authentication/services';
import { Authentication } from '@authentication/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({ usernameField: 'identifier' });
  }

  async validate(identifier: string, password: string): Promise<Authentication> {
    const registry = await this.authenticationService.getRegistry(identifier, password);
    return registry;
  }
}
