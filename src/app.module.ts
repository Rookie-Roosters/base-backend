import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ChatsModule } from './modules/chats/chats.module';
import { ChatBotModule } from './modules/chat-bot/chat-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://U1u46TAzYHZ6:${process.env.DATABASE_PASSWORD}@cluster0.amcyczw.mongodb.net/Base?retryWrites=true&w=majority`,
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AuthModule,
    UsersModule,
    ChatsModule,
    ChatBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
