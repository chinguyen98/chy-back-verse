import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import Config from 'src/shared/configs';
import { AUTH_COOKIE } from 'src/shared/constants';
import { AppRequest } from 'src/shared/types/app';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const data = request?.cookies[AUTH_COOKIE];
          return data;
        },
      ]),
      secretOrKey: Config.jwt.refreshTokenSecret,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(req: AppRequest) {
    const refreshTokenData = await this.refreshTokenService.getRefreshToken(
      req.cookies[AUTH_COOKIE]
    );

    if (refreshTokenData) {
      return refreshTokenData;
    }

    return null;
  }
}
