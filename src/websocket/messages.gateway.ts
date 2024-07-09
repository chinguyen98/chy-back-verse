import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WebSocketMessage } from 'src/shared/types/websocket';
import { Server } from 'ws';

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ping')
  handlePing(client: any, data: any): WebSocketMessage<string> {
    console.log('handlePing', client, data);
    return {
      event: 'pong',
      data: '',
    };
  }
}
