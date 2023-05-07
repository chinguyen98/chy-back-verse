import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Config from 'src/shared/configs';
import { ACCESS_TOKEN_PAYLOAD } from 'src/shared/types/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.jwt.secret,
    });
  }

  async validate(payload: any): Promise<ACCESS_TOKEN_PAYLOAD> {
    return { username: payload.username, sub: payload.id };
  }
}
