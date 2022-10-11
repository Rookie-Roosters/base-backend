import { IsAlphanumeric, IsEnum, IsNumber, IsInt } from 'class-validator';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TESTING = 'testing',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  VERSION: number;

  @IsNumber()
  PORT: number;

  @IsAlphanumeric()
  BASE_API_KEY: string;

  @IsAlphanumeric()
  BASE_API_TOKEN: string;
}
