import { Injectable } from '@nestjs/common';
import { RegisterCredentialsDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  async signUp(registerDto: RegisterCredentialsDto) {
    return 'ecec';
  }
}
