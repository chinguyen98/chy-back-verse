import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/shared/configs';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_CONFIG.SECRET,
      signOptions: { expiresIn: '1 day' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
