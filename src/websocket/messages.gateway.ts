import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(81, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('messages')
  onEvent(client: any, data: any): any {
    console.log('onEvent');
    return 'Hello!';
  }
}
