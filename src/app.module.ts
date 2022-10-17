import { Module } from '@nestjs/common';

import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { CompaniesModule } from '@companies/companies.module';
import { ChatbotModule } from '@chatbot/chatbot.module';
import { AutomationModule } from '@automation/automation.module';
import { ChatsModule } from '@chats/chats.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CoreModule,
    UsersModule,
    CompaniesModule,
    ChatbotModule,
    AutomationModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
