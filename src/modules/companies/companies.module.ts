import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { CompaniesController } from './controllers';
import { Company } from './entities';
import { CompaniesService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), UsersModule],
  providers: [CompaniesService],
  controllers: [CompaniesController],
  exports: [CompaniesService],
})
export class CompaniesModule {}
