import { Controller, Post, Param, Get, Put, Body } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_RESOURCES,
  DEFAULT_API_PATHS,
} from 'src/utils/constants/api-routes.constants';
import { ICommonHttpResponse } from 'src/utils/interfaces/http-response.interface';
import { ValidateIdPipe } from 'src/utils/pipes/validate-id.pipe';
import { MessageDto } from '../dtos/message.dto';
import { ChatsService } from '../services/chats.service';

@ApiTags('Chats')
@Controller(API_RESOURCES.CHATS)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post(`:${DEFAULT_API_PATHS.BY_ID}`)
  @ApiParam({
    name: DEFAULT_API_PATHS.BY_ID,
    type: String,
    description: 'Receiving `User`',
  })
  async create(
    @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) receiver: string,
    // @CurrentUser() currentUser,
  ): Promise<ICommonHttpResponse> {
    return {
      data: await this.chatsService.create(
        '633f61951138defd1e587acf',
        receiver,
      ),
    };
  }

  @Get()
  async chats(): // @CurrentUser() currentUser,
  Promise<ICommonHttpResponse> {
    return {
      data: await this.chatsService.chats('633f61951138defd1e587acf'),
    };
  }

  @Get(`:${DEFAULT_API_PATHS.BY_ID}`)
  @ApiParam({
    name: DEFAULT_API_PATHS.BY_ID,
    type: String,
    description: 'Receiving `User`',
  })
  async chat(
    @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) receiver: string,
    // @CurrentUser() currentUser
  ): Promise<ICommonHttpResponse> {
    return {
      data: await this.chatsService.chat('633f61951138defd1e587acf', receiver),
    };
  }

  @Put(`${API_ENDPOINTS.CHATS.SEND}/:${DEFAULT_API_PATHS.BY_ID}`)
  @ApiParam({
    name: DEFAULT_API_PATHS.BY_ID,
    type: String,
    description: 'Receiving `User`',
  })
  @ApiBody({
    type: MessageDto,
  })
  async send(
    @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) receiver: string,
    // @CurrentUser() currentUser
    @Body() messageDto: MessageDto,
  ): Promise<ICommonHttpResponse> {
    return {
      data: await this.chatsService.send(
        '633f61951138defd1e587acf',
        receiver,
        messageDto.message,
      ),
    };
  }
}
