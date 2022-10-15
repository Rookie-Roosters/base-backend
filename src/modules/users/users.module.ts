import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionController, UsersController } from './controllers';
import { SessionService, UsersService } from './services';
import { User } from './entities';
import { SocketsService } from './services/sockets/sockets.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, SessionController],
  providers: [UsersService, SessionService, SocketsService],
  exports: [UsersService, SessionService],
})
export class UsersModule {}
