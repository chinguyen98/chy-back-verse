import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { VerificationModule } from './verification/verification.module';
import Config from './shared/configs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => Config] }),
    DataModule,
    AuthModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
