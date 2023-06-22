import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import Config from 'src/shared/configs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: Config.jwt.secret,
      signOptions: { expiresIn: '1 day' },
    }),
    PassportModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
