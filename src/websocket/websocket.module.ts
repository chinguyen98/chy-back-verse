import { Module } from '@nestjs/common';
import { MessagesGateway } from 'src/websocket/messages.gateway';

@Module({
  providers: [MessagesGateway],
})
export class WebsocketModule {}
