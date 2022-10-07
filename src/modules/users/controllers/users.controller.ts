import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_RESOURCES } from 'src/utils/constants/api-routes.constants';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller(API_RESOURCES.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async create() {
    return await this.usersService.create();
  }
}
