import { API_ENDPOINTS } from '@core/constants';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocumentByIdParam, DocumentByIdParam } from '@shared/decorators';
import { User } from '@users/schemas';
import { UsersService } from '@users/services';

@ApiTags('Users')
@Controller(API_ENDPOINTS.USERS.BASE_PATH)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create() {
    return await this.usersService.create();
  }

  @Get()
  async findAll() {
    return this.usersService.getAll();
  }

  @Get(API_ENDPOINTS.USERS.BY_ID)
  @ApiDocumentByIdParam(User.name)
  async findOne(@DocumentByIdParam(User.name) user: User) {
    return user;
  }
}
