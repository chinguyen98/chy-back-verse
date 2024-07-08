import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ping')
  handlePing(client: any, data: any): any {
    console.log('handlePing', client, data);
    return 'pong';
  }
}
