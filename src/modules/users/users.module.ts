import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionController, UsersController } from './controllers';
import { SessionService, UsersService } from './services';
import { Socket, User } from './entities';
import { SocketsService } from './services/sockets/sockets.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Socket])],
  controllers: [UsersController, SessionController],
  providers: [UsersService, SessionService, SocketsService],
  exports: [UsersService, SessionService, SocketsService],
})
export class UsersModule {}
