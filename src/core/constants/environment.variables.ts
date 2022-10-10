import { IsAlphanumeric, IsEnum, IsNumber } from 'class-validator';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TESTING = 'testing',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsAlphanumeric()
  DATABASE_USER: string;

  @IsAlphanumeric()
  DATABASE_PASSWORD: string;
}
