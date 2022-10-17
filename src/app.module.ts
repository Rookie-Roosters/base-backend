import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { CompaniesModule } from '@companies/companies.module';
import { ChatbotModule } from '@chatbot/chatbot.module';
import { AutomationModule } from '@automation/automation.module';
import { NotificationsModule } from '@notifications/notifications.module';
import { ChatsModule } from '@chats/chats.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CoreModule,
    UsersModule,
    CompaniesModule,
    ChatbotModule,
    AutomationModule,
    ChatsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
