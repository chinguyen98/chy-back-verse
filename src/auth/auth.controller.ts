import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCredentialsDto, AuthResponseDto, SigninCredentialsDto } from './auth.dto';
import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sign-up')
  signUp(@Body(ValidationPipe) registerdto: RegisterCredentialsDto): Promise<AuthResponseDto> {
    return this.authService.signUp(registerdto);
  }

  @SkipAuth()
  @Post('sign-in')
  signIn(@Body(ValidationPipe) signInDto: SigninCredentialsDto): Promise<AuthResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @SkipAuth()
  @Get('profile')
  getProfile() {
    return 'req.user';
  }
}
