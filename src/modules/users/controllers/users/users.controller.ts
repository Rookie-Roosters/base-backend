import { Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';

import { ApiController, ApiDelete, ApiGet, ApiPatch, ApiPost } from '@shared/decorators';
import { API_ENDPOINTS, API_VERSIONS, IHttpResponse } from '@core/constants';
import { User } from '@users/entities';
import { UsersService } from '@users/services';
import { UserCreateDto, UserUpdateDto } from '@users/dto';
import { AuthTokenResponse } from '@users/constants/authentication.constants';
import { UserLogInDto } from '@users/dto/user-login.dto';
import { LocalAuthGuard } from '@authentication/guards';
import { UserSignUpDto } from '@users/dto/user-signup.dto';
import { Authentication } from '@authentication/entities';
import { CurrentAuth } from '@authentication/decorators';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithAuth extends Request {
  authentication: Authentication;
}

@ApiController(API_ENDPOINTS.USERS.BASE_PATH, API_VERSIONS.V1)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiPost({
    path: API_ENDPOINTS.USERS.LOG_IN,
    responseType: AuthTokenResponse,
  })
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: UserLogInDto })
  async logIn(@CurrentAuth() authentication: Authentication) {
    const user = await this.usersService.findByEmail(authentication.identifier);
    const data: AuthTokenResponse = { user, authToken: '2' };
    return { data };
  }

  @ApiPost({
    path: API_ENDPOINTS.USERS.SIGN_UP,
    responseType: AuthTokenResponse,
  })
  async signUp(@Body() body: UserSignUpDto): Promise<IHttpResponse<AuthTokenResponse>> {
    const user = await this.usersService.signUp(body);
    const data: AuthTokenResponse = { user, authToken: '777' };
    return { data };
  }

  @ApiPost({
    summary: 'Create a new `User`',
    description: 'Stores a new `User` record into the database',
    responseDescription: 'A model containing the newly created `User` information',
    responseType: User,
  })
  async create(@Body() dto: UserCreateDto): Promise<IHttpResponse<User>> {
    const data = await this.usersService.create(dto);
    return { data };
  }

  @ApiGet({
    summary: 'Get all `Users`',
    description: 'Retrieves a list containing every `User` record in the database',
    responseDescription: 'A list of models containing the information of every `User` in the database',
    responseType: [User],
  })
  async findAll(): Promise<IHttpResponse<User[]>> {
    const data = await this.usersService.findAll();
    return { data };
  }

  @ApiGet({
    path: API_ENDPOINTS.USERS.BY_ID,
    summary: 'Get a `User` by Id',
    description: 'Retrieves an `User` record that matches the Id',
    responseDescription: 'A model containing the information of the matched `User`',
    responseType: User,
  })
  @ApiParam({ name: 'id', type: Number })
  async findById(@Param('id') id: number): Promise<IHttpResponse<User>> {
    const data = await this.usersService.findById(id);
    return { data };
  }

  @ApiPatch({
    path: API_ENDPOINTS.USERS.BY_ID,
    summary: 'Update an `User` by Id',
    description: 'Updates an `User` record that matches the Id',
    responseDescription: 'A model containing the updated information of the matched `User`',
    responseType: User,
  })
  async updateById(@Param('id') id: number, @Body() body: UserUpdateDto): Promise<IHttpResponse<User>> {
    const data = await this.usersService.updateById(id, body);
    return { data };
  }

  @ApiDelete({
    path: API_ENDPOINTS.USERS.BY_ID,
    summary: 'Delete an `User` by Id',
    description: 'Deletes an `User` record that matches the Id',
    responseDescription: 'A model containing the information of the deleted `User`',
    responseType: User,
  })
  async deleteById(@Param('id') id: number): Promise<IHttpResponse<User>> {
    const data = await this.usersService.deleteById(id);
    return { data };
  }
}
