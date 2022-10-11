import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { EnvironmentService } from '..';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  private username: string;
  private password: string;
  private port: number;

  constructor(private environmentService: EnvironmentService) {
    this.username = this.environmentService.get('DATABASE_USERNAME');
    this.password = this.environmentService.get('DATABASE_PASSWORD');
    this.port = this.environmentService.get('DATABASE_PORT');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: this.port,
      username: this.username,
      password: this.password,
      autoLoadEntities: true,
      synchronize: !this.environmentService.isProduction,
      extra: {
        trustServerCertificate: true,
      },
    };
  }
}
