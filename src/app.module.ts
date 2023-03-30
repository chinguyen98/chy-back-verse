import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DB_CONFIG } from './config';
import { User } from './entities/user.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_CONFIG.HOST,
      port: DB_CONFIG.PORT,
      username: DB_CONFIG.USER_NAME,
      password: DB_CONFIG.PASSWORD,
      database: DB_CONFIG.DB,
      entities: [User],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
