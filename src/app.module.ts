import { RedisModule } from '@nestjs-modules/ioredis';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { DataModule } from './data/data.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import Config from './shared/configs';
import { VerificationModule } from './verification/verification.module';
import { PostsModule } from './posts/posts.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),
    DataModule,
    AuthModule,
    VerificationModule,
    BoardsModule,
    RefreshTokenModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
