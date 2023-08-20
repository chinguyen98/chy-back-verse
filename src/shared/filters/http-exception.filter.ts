import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (error.getStatus() === HttpStatus.UNAUTHORIZED) {
      if (typeof error.response !== 'string') {
        error.response['message'] =
          error.response.message || 'You do not have permission to access this resource';
      }
    }

    const message = error.response.message || error.response || error.message;

    res.status(error.getStatus()).json({
      statusCode: error.getStatus(),
      errorCode: 1,
      message,
      data: null,
    });
  }
}
