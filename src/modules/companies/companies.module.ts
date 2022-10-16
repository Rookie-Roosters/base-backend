import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { BranchesController, CompaniesController } from './controllers';
import { Branch, Company } from './entities';
import { BranchesService, CompaniesService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Branch]), UsersModule],
  providers: [CompaniesService, BranchesService],
  controllers: [CompaniesController, BranchesController],
  exports: [CompaniesService, BranchesService],
})
export class CompaniesModule {}
