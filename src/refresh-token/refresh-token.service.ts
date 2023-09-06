import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Config from 'src/shared/configs';
import { IDataServices } from 'src/shared/core/data-services.abstract';
import { TOKEN_PAYLOAD } from 'src/shared/types/user';
import { RefreshToken } from './refresh-token.model';
import { REQUEST } from '@nestjs/core';
import { AppRequest } from 'src/shared/types/app';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly req: AppRequest
  ) {}

  private async generateTokenString(username: string) {
    const refreshTokenPayload: TOKEN_PAYLOAD = { username };

    const refreshTokenStr = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: Config.jwt.refreshTokenSecret,
      expiresIn: '30 days',
    });

    return refreshTokenStr;
  }

  async generateRefreshToken(username: string) {
    const refreshTokenStr = await this.generateTokenString(username);

    const decodeToken = this.jwtService.decode(refreshTokenStr, {
      json: true,
    }) as TOKEN_PAYLOAD;

    const user = await this.dataServices.users.getBy({ username });

    await this.dataServices.refreshTokens.create({
      token: refreshTokenStr,
      user,
      expired_time: decodeToken?.exp * 1000,
      created_by_ip: this.req.ip,
    });

    return refreshTokenStr;
  }

  async regenerateRefreshToken(oldRefreshToken: RefreshToken): Promise<string> {
    const refreshTokenStr = await this.generateTokenString(oldRefreshToken.user.username);

    const decodeToken = this.jwtService.decode(refreshTokenStr, {
      json: true,
    }) as TOKEN_PAYLOAD;

    const time = new Date().getTime();

    await this.dataServices.refreshTokens.update(oldRefreshToken.id, {
      updated_at: time,
      replaced_by_token: oldRefreshToken.token,
      revoked_time: time,
      revoked_by_ip: this.req.ip,
    });

    await this.dataServices.refreshTokens.create({
      token: refreshTokenStr,
      user: oldRefreshToken.user,
      expired_time: decodeToken?.exp * 1000,
    });

    return refreshTokenStr;
  }

  async getRefreshToken(refreshToken: string) {
    const refreshTokenData = await this.dataServices.refreshTokens.getBy({ token: refreshToken });

    if (!refreshTokenData || !refreshTokenData.isTokenActive()) {
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
    }

    return refreshTokenData;
  }
}
