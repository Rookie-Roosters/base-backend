import { Controller, Post, Param, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS, API_RESOURCES, DEFAULT_API_PATHS } from 'src/utils/constants/api-routes.constants';
import { ICommonHttpResponse } from 'src/utils/interfaces/http-response.interface';
import { MessageDto } from '../dtos/message.dto';
import { ResponseChatDto } from '../dtos/response-chat.dto';
import { ResponseMessageDto } from '../dtos/response-message.dto';
import { ResponseShortChatDto } from '../dtos/response-short-chat.dto';
import { ChatsService } from '../services/chats.service';

@ApiTags('Chats')
@Controller(API_RESOURCES.CHATS)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // @Post(`:${DEFAULT_API_PATHS.BY_ID}`)
  // @ApiParam({
  //   name: DEFAULT_API_PATHS.BY_ID,
  //   type: String,
  //   description: 'Receiving `User`',
  // })
  // @ApiCreatedResponse({ type: ResponseChatDto })
  // async create(
  //   @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) receiver: string,
  //   // @CurrentUser() currentUser,
  // ): Promise<ICommonHttpResponse<ResponseChatDto>> {
  //   return {
  //     data: await this.chatsService.create('633f61951138defd1e587acf', receiver),
  //   };
  // }

  // @Get()
  // @ApiOkResponse({ type: [ResponseShortChatDto] })
  // async chats(): // @CurrentUser() currentUser,
  // Promise<ICommonHttpResponse<ResponseShortChatDto[]>> {
  //   return {
  //     data: await this.chatsService.chats('633f61951138defd1e587acf'),
  //   };
  // }

  // @Get(`:${DEFAULT_API_PATHS.BY_ID}`)
  // @ApiParam({
  //   name: DEFAULT_API_PATHS.BY_ID,
  //   type: String,
  //   description: 'Receiving `User`',
  // })
  // @ApiQuery({
  //   name: 'page',
  //   type: Number,
  //   description: '`min`: 0, `default`: 0',
  //   required: false,
  // })
  // @ApiOkResponse({ type: ResponseChatDto })
  // async chat(
  //   @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) receiver: string,
  //   // @CurrentUser() currentUser
  //   @Query('page', ValidateOptionalNumberPipe) page: number = 0,
  // ): Promise<ICommonHttpResponse<ResponseChatDto>> {
  //   return {
  //     data: await this.chatsService.chat('633f61951138defd1e587acf', receiver, page),
  //   };
  // }

  // @Put(`${API_ENDPOINTS.CHATS.SEND}/:${DEFAULT_API_PATHS.BY_ID}`)
  // @ApiParam({
  //   name: DEFAULT_API_PATHS.BY_ID,
  //   type: String,
  //   description: 'Receiving `User`',
  // })
  // @ApiBody({
  //   type: MessageDto,
  // })
  // @ApiOkResponse({ type: ResponseMessageDto })
  // async send(
  //   @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) receiver: string,
  //   // @CurrentUser() currentUser
  //   @Body() messageDto: MessageDto,
  // ): Promise<ICommonHttpResponse<ResponseMessageDto>> {
  //   return {
  //     data: await this.chatsService.send('633f61951138defd1e587acf', receiver, messageDto.message),
  //   };
  // }
}
