import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRequestData } from 'src/shared/types/app';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private moduleRef: ModuleRef) {
    super();
  }

  async validate(username: string, password: string): Promise<UserRequestData> {
    const user = await this.authService.validateUser({
      username,
      password,
    });

    return {
      data: user,
    };
  }
}
