import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { EventsModule } from './modules/events/events.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [CoreModule, UsersModule, EventsModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
