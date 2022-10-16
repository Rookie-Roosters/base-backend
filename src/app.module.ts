import { CompaniesModule } from '@companies/companies.module';
import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [CoreModule, UsersModule, CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
