import { Authentication } from '@authentication/entities';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@users/services';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authotization = request.user as Authentication;
    if (!authotization) throw new UnauthorizedException('You must log in first');
    const user = await this.usersService.findOne({
      where: { email: authotization.identifier },
      relations: ['authentication'],
    });
    request.user = user;
    return !!user;
  }
}
