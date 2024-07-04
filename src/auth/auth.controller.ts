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
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  @Public()
  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up a user' })
  @ApiResponse({})
  async signUp(@Body(ValidationPipe) registerdto: RegisterCredentialsDto): Promise<boolean> {
    return await this.authService.signUp(registerdto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({})
  async signIn(
    @Response({ passthrough: true }) res: AppResponse,
    @Request() req: AppRequest
  ): Promise<AuthResponseDto> {
    const { accessToken, refreshToken } = await this.authService.signIn(req.user.data, req.ip);
    res.setHeader(AUTH_COOKIE, refreshToken);
    return { accessToken, refreshToken };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshToken(
    @Request() req: AppRequest,
    @Response({ passthrough: true }) res: AppResponse
  ): Promise<AuthResponseDto> {
    const oldRefreshToken = req.user.refreshToken;

    const refreshToken = await this.refreshTokenService.regenerateRefreshToken(
      oldRefreshToken,
      req.ip
    );
    const accessToken = await this.authService.generateAccessToken(oldRefreshToken.user.username);
    res.setHeader(AUTH_COOKIE, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
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
