import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONFIG } from 'src/shared/configs';
import { ACCESS_TOKEN_PAYLOAD } from 'src/shared/types/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG.SECRET,
    });
  }

  async validate(payload: any): Promise<ACCESS_TOKEN_PAYLOAD> {
    return { username: payload.username, sub: payload.id };
  }
}
