import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Config from 'src/shared/configs';
import { IDataServices } from 'src/shared/core/data-services.abstract';
import { TOKEN_PAYLOAD } from 'src/shared/types/user';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly jwtService: JwtService
  ) {}

  async generateRefreshToken(username: string) {
    const refreshTokenPayload: TOKEN_PAYLOAD = { username };

    const refreshTokenStr = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: Config.jwt.refreshTokenSecret,
      expiresIn: '30 days',
    });

    const user = await this.dataServices.users.getBy({ username });

    await this.dataServices.refreshTokens.create({
      token: refreshTokenStr,
      user,
    });

    return refreshTokenStr;
  }
}
