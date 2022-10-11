import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [CoreModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
