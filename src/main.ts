import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import helmet from 'helmet';
import { corsWhiteList } from 'src/shared/configs';
import { uWSAdapter } from 'src/shared/libs/uWebsocket';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const documentConfig = new DocumentBuilder()
    .setTitle('Discochy')
    .setDescription('Discochy API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('doc', app, document);

  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || corsWhiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS!!!!'));
      }
    },
    credentials: true,
  });

  app.useWebSocketAdapter(new uWSAdapter({ port: 6009 }));

  await app.listen(6006);
}
bootstrap();
