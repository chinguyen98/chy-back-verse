import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCredentialsDto, RegisterResponseDto } from './auth.dto';
import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body(ValidationPipe) registerdto: RegisterCredentialsDto): Promise<RegisterResponseDto> {
    return this.authService.signUp(registerdto);
  }

  @SkipAuth()
  @Get('profile')
  getProfile() {
    return 'req.user';
  }
}
