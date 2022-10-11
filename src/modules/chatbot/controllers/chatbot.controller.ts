import { ChatbotService } from "@chatbotservices/chatbot.service";
import { API_ENDPOINTS, API_VERSIONS } from "@core/constants";
import { ApiTags } from "@nestjs/swagger";
import { ApiController } from "@shared/decorators";


@ApiTags('Chatbot')
@ApiController(API_ENDPOINTS.CHATBOT.BASE_PATH, API_VERSIONS.V1)
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  // @Get(API_ENDPOINTS.CHAT_BOT.TRAIN)
  // @ApiOperation({
  //   summary: 'Train the chatbot',
  //   description: 'Trains the `chatbot` with the new topics, questions or answers',
  // })
  // @ApiOkResponse()
  // async train(): Promise<ICommonHttpResponse<void>> {
  //   await this.chatBotService.train();
  //   return {};
  // }


  // @Post(API_ENDPOINTS.CHAT_BOT.TOPICS)
  // @ApiOperation({
  //   summary: '[Administrators] Create a new chatbot topic',
  //   description:
  //     'Creates a new `chatbot` topic for questions and answers, and returns the created topic',
  // })
  // @ApiBody({ type: RequestTopicDto, description: 'The topic to create' })
  // @ApiCreatedResponse({
  //   type: ResponseTopicDto,
  //   description: 'The topic created',
  // })
  // async createTopic(
  //   @Body() topic: RequestTopicDto,
  // ): Promise<ICommonHttpResponse<ResponseTopicDto>> {
  //   return {
  //     data: await this.chatBotService.createTopic(topic),
  //   };
  // }

  // @Get(API_ENDPOINTS.CHAT_BOT.TOPICS)
  // @ApiOperation({
  //   summary: 'Get all chatbot topics',
  //   description: 'Returns all `chatbot` topics',
  // })
  // @ApiOkResponse({ type: [ResponseTopicDto], description: '`chatbog` topics' })
  // async findAll(): Promise<ICommonHttpResponse<ResponseTopicDto[]>> {
  //   return {
  //     data: await this.chatBotService.findAll(),
  //   };
  // }

  // @Delete(`${API_ENDPOINTS.CHAT_BOT.TOPICS}/:${DEFAULT_API_PATHS.BY_ID}`)
  // @ApiOperation({
  //   summary: 'Delete a chatbot topic',
  //   description: 'Deletes a chatbot `topic`',
  // })
  // @ApiParam({ name: DEFAULT_API_PATHS.BY_ID, description: 'id of the topic' })
  // @ApiOkResponse()
  // async delete(
  //   @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) _id: string,
  // ): Promise<ICommonHttpResponse<void>> {
  //   await this.chatBotService.delete(_id);
  //   return {};
  // }

  // @Put(`${API_ENDPOINTS.CHAT_BOT.QUESTION}/:${DEFAULT_API_PATHS.BY_ID}`)
  // @ApiOperation({
  //   summary: 'Add a question to a topic',
  //   description: 'Adds a question to the topic and returns the topic',
  // })
  // @ApiParam({ name: DEFAULT_API_PATHS.BY_ID, description: 'id of the topic' })
  // @ApiBody({ type: QuestionDto, description: 'Question to add to the topic' })
  // @ApiOkResponse({
  //   type: ResponseTopicDto,
  //   description: 'The topic with the added question',
  // })
  // async addQuestion(
  //   @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) _id: string,
  //   @Body() questionDto: QuestionDto,
  // ): Promise<ICommonHttpResponse<ResponseTopicDto>> {
  //   return {
  //     data: await this.chatBotService.addQuestion(_id, questionDto),
  //   };
  // }

  // @Delete(`${API_ENDPOINTS.CHAT_BOT.QUESTION}/:${DEFAULT_API_PATHS.BY_ID}`)
  // @ApiOperation({
  //   summary: 'Delete a question from a topic',
  //   description: 'Deletes a question from the topic and returns the topic',
  // })
  // @ApiParam({ name: DEFAULT_API_PATHS.BY_ID, description: 'id of the topic' })
  // @ApiBody({
  //   type: QuestionDto,
  //   description: 'Question to delete from the topic',
  // })
  // @ApiOkResponse({
  //   type: ResponseTopicDto,
  //   description: 'The topic',
  // })
  // async deleteQuestion(
  //   @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) _id: string,
  //   @Body() questionDto: QuestionDto,
  // ): Promise<ICommonHttpResponse<ResponseTopicDto>> {
  //   return {
  //     data: await this.chatBotService.deleteQuestion(_id, questionDto),
  //   };
  // }

  // @Put(`${API_ENDPOINTS.CHAT_BOT.ANSWER}/:${DEFAULT_API_PATHS.BY_ID}`)
  // @ApiOperation({
  //   summary: 'Add a answer to a topic',
  //   description: 'Adds a answer to the topic and returns the topic',
  // })
  // @ApiParam({ name: DEFAULT_API_PATHS.BY_ID, description: 'id of the topic' })
  // @ApiBody({ type: AnswerDto, description: 'Answer to add to the topic' })
  // @ApiOkResponse({
  //   type: ResponseTopicDto,
  //   description: 'The topic with the added answer',
  // })
  // async addAnswer(
  //   @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) _id: string,
  //   @Body() answerDto: AnswerDto,
  // ): Promise<ICommonHttpResponse<ResponseTopicDto>> {
  //   return {
  //     data: await this.chatBotService.addAnswer(_id, answerDto),
  //   };
  // }

  // @Delete(`${API_ENDPOINTS.CHAT_BOT.ANSWER}/:${DEFAULT_API_PATHS.BY_ID}`)
  // @ApiOperation({
  //   summary: 'Delete a answer from a topic',
  //   description: 'Deletes a answer from the topic and returns the topic',
  // })
  // @ApiParam({ name: DEFAULT_API_PATHS.BY_ID, description: 'id of the topic' })
  // @ApiBody({ type: AnswerDto, description: 'Answer to add from the topic' })
  // @ApiOkResponse({
  //   type: ResponseTopicDto,
  //   description: 'The topic',
  // })
  // async deleteAnswer(
  //   @Param(DEFAULT_API_PATHS.BY_ID, ValidateIdPipe) _id: string,
  //   @Body() answerDto: AnswerDto,
  // ): Promise<ICommonHttpResponse<ResponseTopicDto>> {
  //   return {
  //     data: await this.chatBotService.deleteAnswer(_id, answerDto),
  //   };
  // }

  // @Get()
  // @ApiOperation({
  //   summary: '[Users] Get the chatbot response',
  //   description: 'Returns the answer to the question asked to the `chatbot`',
  // })
  // @ApiQuery({
  //   name: 'question',
  //   type: String,
  //   description: 'The question to ask to the `chatbot`',
  // })
  // @ApiOkResponse({ type: AnswerDto, description: 'The `chatbot` answer' })
  // async chatbot(
  //   @Query('question', ValidateQuestionPipe) question: string, //Validate the question :(
  // ): Promise<ICommonHttpResponse<AnswerDto>> {
  //   return {
  //     data: await this.chatBotService.chatbot(question),
  //   };
  // }
}
