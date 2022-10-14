import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [EventEmitterModule.forRoot()],
  providers: [EventsGateway, EventsService]
})
export class EventsModule {}
