import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswerDto } from '../dtos/answer.dto';
import { QuestionDto } from '../dtos/question.dto';
import { RequestTopicDto } from '../dtos/request-topic.dto';
import { ResponseTopicDto } from '../dtos/response-topic.dto';
import { ChatBot, ChatBotDocument } from '../schemas/chatbot.schema';
import * as fs from 'fs';
const { NlpManager } = require('node-nlp');

@Injectable()
export class ChatBotService {
  manager: any;
  constructor(
    @InjectModel(ChatBot.name) private chatBotModel: Model<ChatBotDocument>,
  ) {
    if (fs.existsSync('./model.nlp')) {
      this.manager = new NlpManager({ languages: ['es'], forceNER: true });
      this.manager.load('./model.nlp');
    } else this.train();
  }

  async train() {
    this.manager = new NlpManager({ languages: ['es'], forceNER: true });
    const chatBot = await this.findAll();
    chatBot.map((topic) => {
      topic.questions.map((question) => {
        this.manager.addDocument('es', question, topic.topic);
      });
    });

    const hrstart = process.hrtime();
    await this.manager.train();
    const hrend = process.hrtime(hrstart);
    console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

    chatBot.map((topic) => {
      topic.answers.map((answer) => {
        this.manager.addAnswer('es', topic.topic, answer);
      });
    });
    await this.manager.save();
  }

  private async findOneByTopic(topic: string) {
    return await this.chatBotModel.findOne({
      topic,
    });
  }

  private async findOne(_id: string) {
    return await this.chatBotModel.findOne({
      _id,
    });
  }

  async chatbot(question: string): Promise<AnswerDto> {
    const answer = await this.manager.process('es', question);
    return {
      answer: answer.answer,
    };
  }

  async createTopic(
    requestTopicDto: RequestTopicDto,
  ): Promise<ResponseTopicDto> {
    if (!(await this.findOneByTopic(requestTopicDto.topic))) {
      const createdChatBot = new this.chatBotModel({
        topic: requestTopicDto.topic,
        questions: [],
        answers: [],
      });
      return await createdChatBot.save();
    } else throw new ForbiddenException('Topic must not already exists');
  }

  async findAll(): Promise<ResponseTopicDto[]> {
    return await this.chatBotModel.find();
  }

  async delete(_id: string): Promise<void> {
    if (await this.findOne(_id)) {
      const res = await this.chatBotModel.deleteOne({ _id });
      if (res.deletedCount == 0)
        throw new ForbiddenException('Topic not deleted');
    } else throw new ForbiddenException('Topic must exists');
  }

  async addQuestion(
    _id: string,
    questionDto: QuestionDto,
  ): Promise<ResponseTopicDto> {
    if (await this.findOne(_id)) {
      if (
        !(await this.chatBotModel.findOne({
          questions: questionDto.question.toLocaleLowerCase(),
        }))
      ) {
        const res = await this.chatBotModel.updateOne(
          { _id },
          { $push: { questions: questionDto.question.toLowerCase() } },
        );
        if (res.modifiedCount != 0) return this.findOne(_id);
        else throw new ForbiddenException('Topic not modified');
      } else throw new ForbiddenException('Question must no already exists');
    } else throw new ForbiddenException('Topic must exists');
  }

  async deleteQuestion(
    _id: string,
    questionDto: QuestionDto,
  ): Promise<ResponseTopicDto> {
    if (await this.findOne(_id)) {
      if (
        await this.chatBotModel.findOne({
          questions: questionDto.question,
        })
      ) {
        const res = await this.chatBotModel.updateOne(
          { _id },
          { $pull: { questions: questionDto.question } },
        );
        if (res.modifiedCount != 0) return this.findOne(_id);
        else throw new ForbiddenException('Topic not modified');
      } else throw new ForbiddenException('Question must exists');
    } else throw new ForbiddenException('Topic must exists');
  }

  async addAnswer(
    _id: string,
    answerDto: AnswerDto,
  ): Promise<ResponseTopicDto> {
    if (await this.findOne(_id)) {
      if (
        !(await this.chatBotModel.findOne({
          answers: answerDto.answer,
        }))
      ) {
        const res = await this.chatBotModel.updateOne(
          { _id },
          { $push: { answers: answerDto.answer } },
        );
        if (res.modifiedCount != 0) return this.findOne(_id);
        else throw new ForbiddenException('Topic not modified');
      } else throw new ForbiddenException('Answer must no already exists');
    } else throw new ForbiddenException('Topic must exists');
  }

  async deleteAnswer(
    _id: string,
    answerDto: AnswerDto,
  ): Promise<ResponseTopicDto> {
    if (await this.findOne(_id)) {
      if (
        await this.chatBotModel.findOne({
          answers: answerDto.answer,
        })
      ) {
        const res = await this.chatBotModel.updateOne(
          { _id },
          { $pull: { answers: answerDto.answer } },
        );
        if (res.modifiedCount != 0) return this.findOne(_id);
        else throw new ForbiddenException('Topic not modified');
      } else throw new ForbiddenException('Answer must exists');
    } else throw new ForbiddenException('Topic must exists');
  }
}
