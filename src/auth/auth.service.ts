import { Injectable, NotAcceptableException } from '@nestjs/common';
import { RegisterCredentialsDto, RegisterResponseDto } from './dto/auth.dto';
import dayjs from 'src/shared/libs/daytime';

@Injectable()
export class AuthService {
  // constructor(@InjectModel(User.modelName) private readonly _userModel: ModelType<User>) {}

  async signUp(registerDto: RegisterCredentialsDto): Promise<RegisterResponseDto> {
    const { day, month, year } = registerDto;

    const isValidDate = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD', true).isValid();
    if (!isValidDate) {
      throw new NotAcceptableException('Invald date format.');
    }

    return { accessToken: 'ecec' };
  }
}
