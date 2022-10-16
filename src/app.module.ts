import { Module } from '@nestjs/common';

import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { CompaniesModule } from '@companies/companies.module';
import { ChatbotModule } from '@chatbot/chatbot.module';
import { AutomationModule } from '@automation/automation.module';
import { NotificationsModule } from '@notifications/notifications.module';

@Module({
  imports: [CoreModule, UsersModule, CompaniesModule, ChatbotModule, AutomationModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
