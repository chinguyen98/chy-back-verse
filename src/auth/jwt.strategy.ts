import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Config from 'src/shared/configs';
import type { UserRequestData } from 'src/shared/types/app';
import { AuthService } from './auth.service';
import { User } from './user.model';
import Redis from 'ioredis';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRedis() private readonly redis: Redis,
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

    const cacheUser: User = JSON.parse(await this.redis.get(`user:${username}`));

    if (cacheUser) {
      return {
        data: cacheUser,
      };
    }

    const user = await this.authService.getUserByUsername(username);
    if (user) {
      await this.redis.set(`user:${username}`, JSON.stringify(user), 'EX', 60 * 60 * 24 * 30 * 12);
      return {
        data: user,
      };
    }

    return null;
  }
}
