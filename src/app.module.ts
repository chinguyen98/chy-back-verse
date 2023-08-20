import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import type { CommonRedisOptions } from 'ioredis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { DataModule } from './data/data.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import Config from './shared/configs';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => Config] }),
    CacheModule.registerAsync<CommonRedisOptions>({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        username: Config.redis.username,
        password: Config.redis.password,
        host: Config.redis.host,
        port: Config.redis.port,
      }),
    }),
    DataModule,
    AuthModule,
    VerificationModule,
    BoardsModule,
    RefreshTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
