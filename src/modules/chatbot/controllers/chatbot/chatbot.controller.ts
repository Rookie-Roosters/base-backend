import { Body, Param, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { API_ENDPOINTS, IHttpResponse } from '@core/constants';
import { AnswerDto, QuestionDto, RequestTopicDto, ResponseTopicDto } from '@chatbot/dtos';
import { ValidateQuestionPipe } from '@chatbot/pipes';
import { ChatbotService } from '@chatbot/services';
import { ApiController, ApiDelete, ApiGet, ApiPatch, ApiPost } from '@shared/decorators';

import { ValidateIdPipe } from '@core/pipes/validate-id.pipe';

@ApiTags('Chatbot')
@ApiController(API_ENDPOINTS.CHATBOT.BASE_PATH)
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @ApiGet({
    path: API_ENDPOINTS.CHATBOT.TRAIN,
    summary: 'Train the `Chatbot`',
    description: 'Trains the `Chatbot` with the new topics, questions or answers',
  })
  async train(): Promise<IHttpResponse<void>> {
    await this.chatbotService.train();
    return {};
  }

  @ApiPost({
    path: API_ENDPOINTS.CHATBOT.TOPICS,
    summary: 'Create a new `Chatbot` topic',
    description: 'Creates a new `Chatbot` topic for questions and answers, and returns the created topic',
    responseDescription: 'The topic created',
    responseType: ResponseTopicDto,
  })
  @ApiBody({ type: RequestTopicDto, description: 'The topic to create' })
  async createTopic(@Body() topic: RequestTopicDto): Promise<IHttpResponse<ResponseTopicDto>> {
    return {
      data: await this.chatbotService.createTopic(topic),
    };
  }

  @ApiGet({
    path: API_ENDPOINTS.CHATBOT.TOPICS,
    summary: 'Get all `Chatbot` topics',
    description: 'Returns all `Chatbot` topics',
    responseDescription: '`Chatbot` topics',
    responseType: [ResponseTopicDto],
  })
  async findAll(): Promise<IHttpResponse<ResponseTopicDto[]>> {
    return {
      data: await this.chatbotService.findAll(),
    };
  }

  @ApiDelete({
    path: `${API_ENDPOINTS.CHATBOT.TOPICS}/:${API_ENDPOINTS.CHATBOT.BY_ID}`,
    summary: 'Delete a `Chatbot` topic',
    description: 'Deletes a `Chatbot` topic',
    responseType: DeleteResult,
  })
  @ApiParam({ name: API_ENDPOINTS.CHATBOT.BY_ID, description: 'id of the topic' })
  async delete(@Param(API_ENDPOINTS.CHATBOT.BY_ID, ValidateIdPipe) id: number): Promise<IHttpResponse<DeleteResult>> {
    return {
      data: await this.chatbotService.delete(id),
    };
  }

  @ApiPatch({
    path: `${API_ENDPOINTS.CHATBOT.QUESTION}/:${API_ENDPOINTS.CHATBOT.BY_ID}`,
    summary: 'Add a question to a topic',
    description: 'Adds a question to the topic and returns the topic',
    responseDescription: 'The topic with the added question',
    responseType: ResponseTopicDto,
  })
  @ApiParam({ name: API_ENDPOINTS.CHATBOT.BY_ID, type: Number, description: 'id of the topic' })
  @ApiBody({ type: QuestionDto, description: 'Question to add to the topic' })
  async addQuestion(
    @Param(API_ENDPOINTS.CHATBOT.BY_ID, ValidateIdPipe) id: number,
    @Body() questionDto: QuestionDto,
  ): Promise<IHttpResponse<ResponseTopicDto>> {
    return {
      data: await this.chatbotService.addQuestion(id, questionDto),
    };
  }

  @ApiDelete({
    path: `${API_ENDPOINTS.CHATBOT.QUESTION}/:${API_ENDPOINTS.CHATBOT.BY_ID}`,
    summary: 'Delete a question from a topic',
    description: 'Deletes a question from the topic and returns the topic',
    responseDescription: 'The topic',
    responseType: ResponseTopicDto,
  })
  @ApiParam({ name: API_ENDPOINTS.CHATBOT.BY_ID, description: 'id of the topic' })
  @ApiBody({
    type: QuestionDto,
    description: 'Question to delete from the topic',
  })
  async deleteQuestion(
    @Param(API_ENDPOINTS.CHATBOT.BY_ID, ValidateIdPipe) id: number,
    @Body() questionDto: QuestionDto,
  ): Promise<IHttpResponse<ResponseTopicDto>> {
    return {
      data: await this.chatbotService.deleteQuestion(id, questionDto),
    };
  }

  @ApiPatch({
    path: `${API_ENDPOINTS.CHATBOT.ANSWER}/:${API_ENDPOINTS.CHATBOT.BY_ID}`,
    summary: 'Add a answer to a topic',
    description: 'Adds a anser to the topic and returns the topic',
    responseDescription: 'The topic with the added answer',
    responseType: ResponseTopicDto,
  })
  @ApiParam({ name: API_ENDPOINTS.CHATBOT.BY_ID, type: Number, description: 'id of the topic' })
  @ApiBody({ type: AnswerDto, description: 'Answer to add to the topic' })
  async addAnswer(
    @Param(API_ENDPOINTS.CHATBOT.BY_ID, ValidateIdPipe) id: number,
    @Body() answerDto: AnswerDto,
  ): Promise<IHttpResponse<ResponseTopicDto>> {
    return {
      data: await this.chatbotService.addAnswer(id, answerDto),
    };
  }

  @ApiDelete({
    path: `${API_ENDPOINTS.CHATBOT.ANSWER}/:${API_ENDPOINTS.CHATBOT.BY_ID}`,
    summary: 'Delete a answer from a topic',
    description: 'Deletes a answer from the topic and returns the topic',
    responseDescription: 'The topic',
    responseType: ResponseTopicDto,
  })
  @ApiParam({ name: API_ENDPOINTS.CHATBOT.BY_ID, description: 'id of the topic' })
  @ApiBody({
    type: AnswerDto,
    description: 'Answer to delete from the topic',
  })
  async deleteAnswer(
    @Param(API_ENDPOINTS.CHATBOT.BY_ID, ValidateIdPipe) id: number,
    @Body() answerDto: AnswerDto,
  ): Promise<IHttpResponse<ResponseTopicDto>> {
    return {
      data: await this.chatbotService.deleteAnswer(id, answerDto),
    };
  }

  @ApiGet({
    summary: 'Get the `Chatbot` response',
    description: 'Returns the answer to the question asked to the `Chatbot`',
    responseDescription: 'The `Chatbot` answer',
    responseType: AnswerDto,
  })
  @ApiQuery({
    name: 'question',
    type: String,
    description: 'The question to ask to the `Chatbot`',
  })
  async Chatbot(@Query('question', ValidateQuestionPipe) question: string): Promise<IHttpResponse<AnswerDto>> {
    return {
      data: await this.chatbotService.chatbot(question),
    };
  }
}
