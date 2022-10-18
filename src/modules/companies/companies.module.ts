import { AuthenticationModule } from '@authentication/authentication.module';
import { EnvironmentService } from '@core/services';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { BankingController, CompaniesController } from './controllers';
import { BankCredentials, Company } from './entities';
import { BranchesService, CompaniesService } from './services';
import { BankingService } from './services/banking/banking.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [EnvironmentService],
      useFactory: (environmentService: EnvironmentService) => ({
        secret: environmentService.get('JWT_SECRET'),
        signOptions: { expiresIn: environmentService.get('JWT_EXPIRATION_TIME') },
      }),
    }),
    TypeOrmModule.forFeature([Company, BankCredentials]),
    UsersModule,
    AuthenticationModule,
  ],
  providers: [CompaniesService, BranchesService, BankingService],
  controllers: [CompaniesController, BankingController],
  exports: [CompaniesService, BranchesService],
})
export class CompaniesModule {}
