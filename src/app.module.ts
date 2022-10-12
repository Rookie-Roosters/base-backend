import { ChatbotModule } from '@chatbotchatbot.module';
import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AutomationModule } from './modules/automation/automation.module';

@Module({
  imports: [CoreModule, UsersModule, ChatbotModule, AutomationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
