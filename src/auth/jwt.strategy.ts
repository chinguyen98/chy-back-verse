import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Config from 'src/shared/configs';
import type { UserRequestData } from 'src/shared/types/app';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.jwt.secret,
    });
  }

  async validate(payload: any): Promise<UserRequestData> {
    const username = payload.username;

    const cacheUser = await this.cacheService.get(`user:${username}`);
    if (cacheUser) {
      return cacheUser;
    }

    const user = await this.authService.getUserByUsername(username);
    if (user) {
      await this.cacheService.set(`user:${username}`, user, 60000 * 60 * 60 * 24);
      return {
        data: user,
      };
    }

    return null;
  }
}
