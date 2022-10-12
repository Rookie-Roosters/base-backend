import { Answer } from '@chatbotentities/answer.entity';
import { Question } from '@chatbotentities/question.entity';
import { Topic } from '@chatbotentities/topic';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as fs from 'fs';
import { AnswerDto, QuestionDto, RequestTopicDto, ResponseTopicDto } from '@chatbotdtos';
const { NlpManager } = require('node-nlp');

@Injectable()
export class ChatbotService {
  manager: any;

  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
    @InjectRepository(Question) private questionsRepository: Repository<Question>,
    @InjectRepository(Answer) private answersRepository: Repository<Answer>,
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

  private async findOneTopicByTopic(topic: string): Promise<Topic | null> {
    return await this.topicsRepository.findOne({
      where: {
        topic,
      },
    });
  }

  private async findOneTopic(id: number): Promise<ResponseTopicDto | null> {
    const topic = await this.topicsRepository.findOne({
      where: {
        id,
      },
    });
    if (topic) {
      const questionsAndAnswers = await this.getQuestionsAndAnswers(id);
      return {
        id: topic.id,
        topic: topic.topic,
        answers: questionsAndAnswers.answers,
        questions: questionsAndAnswers.questions,
      };
    }
    return null;
  }

  private async getQuestionsAndAnswers(id: number): Promise<{ questions: string[]; answers: string[] }> {
    const questions = await this.questionsRepository.find({ where: { topic: { id } } });
    const answers = await this.answersRepository.find({ where: { topic: { id } } });
    return {
      questions: questions.map((question) => question.value),
      answers: answers.map((answers) => answers.value),
    };
  }

  async chatbot(question: string): Promise<AnswerDto> {
    const answer = await this.manager.process('es', question);
    return {
      answer: answer.answer,
    };
  }

  async createTopic(requestTopicDto: RequestTopicDto): Promise<ResponseTopicDto> {
    if (!(await this.findOneTopicByTopic(requestTopicDto.topic))) {
      const createdTopic = await this.topicsRepository.save(requestTopicDto);
      return {
        id: createdTopic.id,
        topic: createdTopic.topic,
        questions: [],
        answers: [],
      };
    } else throw new ForbiddenException('Topic must not already exists');
  }

  async findAll(): Promise<ResponseTopicDto[]> {
    const topics = await this.topicsRepository.find({});
    return await Promise.all(
      topics.map(async (topic) => {
        const questionsAndAnswers = await this.getQuestionsAndAnswers(topic.id);
        return {
          id: topic.id!,
          topic: topic.topic,
          questions: questionsAndAnswers.questions,
          answers: questionsAndAnswers.answers,
        };
      }),
    );
  }

  async delete(id: number): Promise<DeleteResult> {
    const topic = await this.findOneTopic(id);
    if (topic) {
      return await this.topicsRepository.delete(topic.id);
    } else throw new ForbiddenException('Topic must exists');
  }

  async addQuestion(id: number, questionDto: QuestionDto): Promise<ResponseTopicDto> {
    const topic = await this.findOneTopic(id);
    if (topic) {
      if (!(await this.questionsRepository.findOne({ where: { value: questionDto.question } }))) {
        const question = await this.questionsRepository.save({
          topic,
          value: questionDto.question,
        });
        if (question) {
          return await this.findOneTopic(id);
        } else throw new ForbiddenException('Question not added');
      } else throw new ForbiddenException('Question must no already exists');
    } else throw new ForbiddenException('Topic must exists');
  }

  async deleteQuestion(id: number, questionDto: QuestionDto): Promise<ResponseTopicDto> {
    const topic = await this.findOneTopic(id);
    if (topic) {
      const question = await this.questionsRepository.findOne({
        where: { topic: { id: topic.id }, value: questionDto.question },
      });
      if (question) {
        const res = await this.questionsRepository.delete(question.id);
        if (res.affected) return await this.findOneTopic(id);
        else throw new ForbiddenException('Question not deleted');
      } else throw new ForbiddenException('Question must exists');
    } else throw new ForbiddenException('Topic must exists');
  }

  async addAnswer(id: number, answerDto: AnswerDto): Promise<ResponseTopicDto> {
    const topic = await this.findOneTopic(id);
    if (topic) {
      if (!(await this.answersRepository.findOne({ where: { value: answerDto.answer } }))) {
        const answers = await this.answersRepository.save({
          topic,
          value: answerDto.answer,
        });
        if (answers) {
          return await this.findOneTopic(id);
        } else throw new ForbiddenException('Answer not added');
      } else throw new ForbiddenException('Answer must no already exists');
    } else throw new ForbiddenException('Topic must exists');
  }

  async deleteAnswer(id: number, answerDto: AnswerDto): Promise<ResponseTopicDto> {
    const topic = await this.findOneTopic(id);
    if (topic) {
      const answer = await this.answersRepository.findOne({
        where: { topic: { id: topic.id }, value: answerDto.answer },
      });
      if (answer) {
        const res = await this.answersRepository.delete(answer.id);
        if (res.affected) return await this.findOneTopic(id);
        else throw new ForbiddenException('Answer not deleted');
      } else throw new ForbiddenException('Answer must exists');
    } else throw new ForbiddenException('Topic must exists');
  }
}
