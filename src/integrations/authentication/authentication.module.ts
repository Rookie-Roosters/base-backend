import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from './entities';
import { AuthenticationService } from './services/authentication/authentication.service';
import { LocalStrategy } from './strategies';

@Module({
  imports: [TypeOrmModule.forFeature([Authentication]), PassportModule],
  providers: [AuthenticationService, LocalStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
