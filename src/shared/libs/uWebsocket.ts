import { WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';

import * as UWS from 'uWebSockets.js';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import * as events from 'events';
import type {
  ICreateServerArgs,
  ICreateServerSecureArgs,
  WebSocketMessage,
} from 'src/shared/types/websocket';

export class UWSBuilder {
  static buildSSLApp(params: ICreateServerSecureArgs): UWS.TemplatedApp {
    return UWS.SSLApp({
      cert_file_name: params.sslCert,
      key_file_name: params.sslKey,
    });
  }

  static buildApp(params: ICreateServerArgs): UWS.TemplatedApp {
    return UWS.App();
  }
}

export class uWSAdapter implements WebSocketAdapter {
  private instance: UWS.TemplatedApp = null;
  private listenSocket: string = null;
  private port = 0;

  constructor(args: ICreateServerArgs | ICreateServerSecureArgs) {
    this.port = args.port;
    // @ts-ignore
    if (args.sslKey) {
      this.instance = UWSBuilder.buildSSLApp(args as ICreateServerSecureArgs);
    } else {
      this.instance = UWSBuilder.buildApp(args);
    }
  }

  bindClientConnect(server: UWS.TemplatedApp, callback): any {
    this.instance
      .ws('/*', {
        open: (socket) => {
          Object.defineProperty(socket, 'emitter', {
            configurable: false,
            value: new events.EventEmitter(),
          });
          callback(socket);
        },
        message: (socket, message, isBinary) => {
          socket['emitter'].emit('message', { message, isBinary });
        },
      })
      .any('/*', (res, req) => {
        res.end('Nothing to see here!');
      });
  }

  bindMessageHandlers(
    client: UWS.WebSocket<any>,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ): any {
    fromEvent(client['emitter'], 'message')
      .pipe(
        mergeMap((data: { message: ArrayBuffer; isBinary: boolean }) =>
          this.bindMessageHandler(data, handlers, process)
        ),
        filter((result) => result)
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    buffer: { message: ArrayBuffer; isBinary: boolean },
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ): Observable<any> {
    const stringMessageData = Buffer.from(buffer.message).toString('utf-8');
    const message: WebSocketMessage<any> = JSON.parse(stringMessageData);
    const messageHandler = handlers.find((handler) => handler.message === message.event);
    if (!messageHandler) {
      return EMPTY;
    }

    return process(messageHandler.callback(message.data));
  }

  close(): any {
    UWS.us_listen_socket_close(this.listenSocket);
    this.instance = null;
  }

  async create(): Promise<UWS.TemplatedApp> {
    return new Promise((resolve, reject) =>
      this.instance.listen(this.port, (token) => {
        if (token) {
          // @ts-ignore
          this.listenSocket = token;
          resolve(this.instance);
        } else {
          reject("Can't start listening...");
        }
      })
    );
  }
}
