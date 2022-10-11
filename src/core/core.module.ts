import { Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariables } from './constants';
import { HttpExceptionFilter } from './filters';
import { DatabaseService, EnvironmentService } from './services';

@Global()
@Module({
  providers: [
    EnvironmentService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: APP_PIPE,
    //   useFactory: () => {
    //     return new ValidationPipe({
    //       whitelist: true,
    //       transform: true,
    //       transformOptions: {
    //         enableImplicitConversion: true,
    //       },
    //     });
    //   },
    // },
  ],
  imports: [
    ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => {
        const validatedConfig = plainToInstance(EnvironmentVariables, config, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(validatedConfig, {
          skipMissingProperties: false,
        });
        if (errors.length > 0) throw new Error(errors.toString());
        return validatedConfig;
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
  ],
  exports: [EnvironmentService],
})
export class CoreModule {}
