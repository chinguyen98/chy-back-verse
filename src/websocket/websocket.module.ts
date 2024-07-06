import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/websocket/event.gateway';

@Module({
  providers: [EventsGateway],
})
export class WebsocketModule {}
