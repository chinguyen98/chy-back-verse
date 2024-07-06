import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import Config from './shared/configs';
import { VerificationModule } from './verification/verification.module';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => Config] }),
    RedisModule.forRoot({
      config: {
        username: Config.redis.username,
        password: Config.redis.password,
        host: Config.redis.host,
      },
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    // }),
    DataModule,
    // TesterModule,
    AuthModule,
    VerificationModule,
    // BoardsModule,
    RefreshTokenModule,
    WebsocketModule,
    // PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
