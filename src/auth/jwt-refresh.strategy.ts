import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Config from 'src/shared/configs';
import { AuthService } from './auth.service';
import { AUTH_COOKIE } from 'src/shared/constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly authService: AuthService) {
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

  async validate(req: Request, payload: any) {
    const username = payload.username;

    const user = await this.authService.getUserByUsername(username);
    if (user) {
      return user;
    }

    return null;
  }
}
