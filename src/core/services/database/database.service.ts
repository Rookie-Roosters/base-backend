import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  private user: string;
  private password: string;

  constructor(private readonly environmentService: EnvironmentService) {
    this.user = this.environmentService.get('DATABASE_USER');
    this.password = this.environmentService.get('DATABASE_PASSWORD');
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `mongodb+srv://${this.user}:${this.password}@cluster0.amcyczw.mongodb.net/Base?retryWrites=true&w=majority`,
    };
  }
}
