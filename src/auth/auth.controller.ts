import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/shared/decorators/skip-auth.decorator';
import { AuthResponseDto, RegisterCredentialsDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from './user.model';
import { instanceToPlain, plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body(ValidationPipe) registerdto: RegisterCredentialsDto): Promise<AuthResponseDto> {
    return this.authService.signUp(registerdto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Get('profile')
  async getProfile(@Request() req): Promise<Partial<User> | null> {
    const user = req.user as User;

    if (user) {
      return plainToClass(User, user);
      // return instanceToPlain(user);
    }

    return null;
  }
}
