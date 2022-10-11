import { Get, Body, Patch, Param, Delete, applyDecorators } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { API_ENDPOINTS, API_VERSIONS } from '@core/constants';
import { ApiController, ApiDelete, ApiPost } from '@shared/decorators';
import { User } from './entities/user.entity';
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@ApiController(API_ENDPOINTS.USERS.BASE_PATH, API_VERSIONS.V1)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiPost()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiPost({
    path: 'creato',
  })
  create2(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiPost({
    path: 'creato3',
    roles: ['admin', 'regular'],
    summary: 'Creates a new User',
    description: 'Creates a new UserDocument and saves it into the database',
    responseDescription: 'The model of the newly created User',
    responseType: User,
  })
  async create3(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return {
      firstName: 'yomero',
    } as User;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiDelete({
    path: API_ENDPOINTS.USERS.BY_ID,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
