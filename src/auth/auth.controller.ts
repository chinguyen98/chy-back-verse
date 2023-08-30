import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Public } from 'src/shared/decorators/skip-auth.decorator';
import type { AppRequest, AppResponse } from 'src/shared/types/app';
import { AuthResponseDto, RegisterCredentialsDto } from './auth.dto';
import { AuthService } from './auth.service';
import JwtRefreshGuard from './jwt-refresh-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from './user.model';
import { AUTH_COOKIE } from 'src/shared/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(
    @Body(ValidationPipe) registerdto: RegisterCredentialsDto,
    @Response({ passthrough: true }) res: AppResponse
  ): Promise<AuthResponseDto> {
    const data = await this.authService.signUp(registerdto);
    res.setHeader(AUTH_COOKIE, data.refreshToken);
    return data;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Request() req,
    @Response({ passthrough: true }) res: AppResponse
  ): Promise<AuthResponseDto> {
    const data = await this.authService.signIn(req.user);
    res.setHeader(AUTH_COOKIE, data.refreshToken);
    return data;
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refreshToken(@Request() req: AppRequest) {
    console.log('ecec', req.cookies, req.user.refreshToken);
    return this.authService.refreshToken();
  }

  @Get('profile')
  async getProfile(@Request() req: AppRequest): Promise<Partial<User> | null> {
    const user = req.user.data;

    if (user) {
      return plainToClass(User, user);
    }

    return null;
  }
}
