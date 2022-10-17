import { ChatsService } from '@chats/services/chats.service';
import { API_ENDPOINTS, IHttpResponse } from '@core/constants';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiController, ApiGet, ApiPatch, ApiPost } from '@shared/decorators';
import { Body, Param, Query } from '@nestjs/common';
import { ValidateIdPipe } from '@core/pipes/validate-id.pipe';
import { UseSessionGuard } from '@users/decorators';
import { ALL_ROLES } from '@authentication/constants';
import { CurrentAuth } from '@authentication/decorators';
import { User } from '@users/entities';
import { ResponseChatDto } from '@chats/dtos';
import { ValidateNumberPipe } from '@core/pipes/validate-number.pipe';
import { MessageDto } from '@chats/dtos/message.dto';

@ApiTags('Chats')
@ApiController(API_ENDPOINTS.CHATS.BASE_PATH)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiPost({
    roles: ALL_ROLES,
    path: `:${API_ENDPOINTS.CHATS.BY_ID}`,
    summary: 'Create a new `Chat`',
    description: 'Creates a new `Chat` and returns the created `Chat`',
    responseDescription: 'Created `Chat`',
    responseType: ResponseChatDto,
  })
  @UseSessionGuard()
  @ApiParam({ name: API_ENDPOINTS.CHATS.BY_ID, type: Number, description: 'Receiving `User`' })
  async create(
    @CurrentAuth() currentUser: User,
    @Param(API_ENDPOINTS.CHATS.BY_ID, ValidateIdPipe) receiver: number,
  ): Promise<IHttpResponse<ResponseChatDto>> {
    return {
      data: await this.chatsService.create(currentUser, receiver),
    };
  }

  @ApiGet({
    roles: ALL_ROLES,
    summary: 'Find all Current User `Chats`',
    description: 'Finds all `Chats` of the Current User and returns it with the last `Message`',
    responseDescription: 'The founds `Chats`',
    responseType: [ResponseChatDto],
  })
  @UseSessionGuard()
  async findAll(@CurrentAuth() currentUser: User): Promise<IHttpResponse<ResponseChatDto[]>> {
    return {
      data: await this.chatsService.findAll(currentUser),
    };
  }

  @ApiGet({
    roles: ALL_ROLES,
    path: `:${API_ENDPOINTS.CHATS.BY_ID}`,
    summary: 'Find a `Chat`',
    description: 'Finds a `Chat` and returns it',
    responseDescription: 'Found `Chat`',
    responseType: ResponseChatDto,
  })
  @UseSessionGuard()
  @ApiParam({ name: API_ENDPOINTS.CHATS.BY_ID, type: Number, description: 'Receiving `User`' })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Message page. Default = 0. 20 messages per page',
    required: false,
  })
  async find(
    @CurrentAuth() currentUser: User,
    @Param(API_ENDPOINTS.CHATS.BY_ID, ValidateIdPipe) receiver: number,
    @Query('page', ValidateNumberPipe) page: number = 0,
  ): Promise<IHttpResponse<ResponseChatDto>> {
    return {
      data: await this.chatsService.find(currentUser, receiver, page),
    };
  }

  @ApiPatch({
    roles: ALL_ROLES,
    path: `${API_ENDPOINTS.CHATS.SEND}/:${API_ENDPOINTS.CHATS.BY_ID}`,
    summary: 'Send a `Message`',
    description: 'Sends a `Message` to the `Chat`',
    responseDescription: 'The `Chat` at the page 0',
    responseType: ResponseChatDto,
  })
  @ApiBody({ type: MessageDto })
  @UseSessionGuard()
  @ApiParam({ name: API_ENDPOINTS.CHATS.BY_ID, type: Number, description: 'Receiving `User`' })
  async send(
    @CurrentAuth() currentUser: User,
    @Param(API_ENDPOINTS.CHATS.BY_ID, ValidateIdPipe) receiver: number,
    @Body() message: MessageDto,
  ): Promise<IHttpResponse<ResponseChatDto>> {
    return {
      data: await this.chatsService.send(currentUser, receiver, message),
    };
  }
}
