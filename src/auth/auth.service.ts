import { Injectable, NotAcceptableException } from '@nestjs/common';
import { isValidDate } from 'src/shared/libs/daytime';
import { RegisterCredentialsDto, RegisterResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  // constructor(@InjectModel(User.modelName) private readonly _userModel: ModelType<User>) {}

  async signUp(registerDto: RegisterCredentialsDto): Promise<RegisterResponseDto> {
    const { date } = registerDto;

    if (!isValidDate({ date })) {
      throw new NotAcceptableException('Date is not valid');
    }

    return { accessToken: 'ecec' };
  }
}
