import { IsAlphanumeric, IsEnum, IsNumber, IsInt, IsString, IsUrl } from 'class-validator';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TESTING = 'testing',
}

export class EnvironmentVariables {
  // Environment
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsInt()
  VERSION: number;
  @IsNumber()
  PORT: number;
  @IsNumber()
  SOCKETS_PORT: number;

  // JWT OPTIONS
  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_EXPIRATION_TIME: string;

  // BASE API
  @IsUrl()
  BASE_API_URL: string;
  @IsAlphanumeric()
  BASE_API_KEY: string;
  @IsAlphanumeric()
  BASE_API_PASSWORD: string;
  @IsAlphanumeric()
  BASE_API_TOKEN: string;

  // MYSQL DATABASE
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsInt()
  DATABASE_PORT: number;

  // SAT
  @IsAlphanumeric()
  SAT_KEY: string;
}
