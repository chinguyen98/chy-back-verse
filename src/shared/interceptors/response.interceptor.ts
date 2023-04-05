import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface ResponseType<T> {
  statusCode: number;
  errorCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const errorCode = [HttpStatus.OK, HttpStatus.CREATED].includes(statusCode) ? 0 : 1;

    return next.handle().pipe(
      map((data) => ({
        statusCode: statusCode,
        errorCode,
        message: data.message || '',
        data: data,
      }))
    );
  }
}
