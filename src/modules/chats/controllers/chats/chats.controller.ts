import { MessageDto, ResponseChatDto, ResponseShortChatDto } from '@chats/dtos';
import { ChatsService } from '@chats/services';
import { API_ENDPOINTS } from '@core/constants';
import { Controller, Post, Param, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Chats')
@Controller(API_ENDPOINTS.CHATS.BASE_PATH)
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
