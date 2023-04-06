import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/shared/configs';
import { IS_SKIP_AUTH_KEY } from 'src/shared/decorators/skip-auth.decorator';
import { ACCESS_TOKEN_PAYLOAD } from 'src/shared/types/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(IS_SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isSkipAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verifyAsync<ACCESS_TOKEN_PAYLOAD>(accessToken, {
        secret: JWT_CONFIG.SECRET,
      });

      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
