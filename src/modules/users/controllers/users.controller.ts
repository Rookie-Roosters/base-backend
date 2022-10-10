import { Controller, Get, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DevelopmentOnly, DocumentByIdParam } from '@shared/decorators';
import { API_RESOURCES } from 'src/utils/constants/api-routes.constants';
import { User, UserDocument } from '../schemas/user.schema';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller(API_RESOURCES.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create() {
    return await this.usersService.create();
  }

  @DevelopmentOnly()
  @Post('testo')
  async testo(): Promise<User> {
    const testo = await this.usersService.testoSev();
    return testo;
  }

  @Get('all')
  async findAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  async findOne(@DocumentByIdParam(User.name) user: UserDocument) {
    return user;
  }
}
