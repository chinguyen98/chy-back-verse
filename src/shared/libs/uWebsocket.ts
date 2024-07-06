import { WebSocketAdapter, INestApplicationContext, WsMessageHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { App, TemplatedApp } from 'uWebSockets.js';

export class UwsAdapter implements WebSocketAdapter {
  constructor(private app: INestApplicationContext) {}

  create(port: number, options?: any) {
    return App()
      .ws('/*', {})
      .listen(port, (token) => {
        if (token) {
          console.log(`Listening to port ${port}`);
        } else {
          console.log(`Failed to listen to port ${port}`);
        }
      });
  }

  bindClientConnect(server: TemplatedApp, callback) {
    server.ws('/*', {
      open(ws) {
        console.log('A WebSocket connected!');
        callback();
      },
    });
  }

  bindClientDisconnect(client: TemplatedApp, callback) {
    client.ws('/*', {
      close(ws) {
        console.log('A WebSocket closed!');
        callback();
      },
    });
  }

  bindMessageHandlers(
    client: any,
    handlers: WsMessageHandler[],
    transform: (data: any) => Observable<any>
  ) {
    console.log('ececec');
  }

  close(server: TemplatedApp) {
    server.close();
  }
}
