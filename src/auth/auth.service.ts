import { Injectable, NotAcceptableException } from '@nestjs/common';
import { isValidDate } from 'src/shared/libs/daytime';
import { RegisterCredentialsDto, RegisterResponseDto } from './dto/auth.dto';
import { IDataServices } from 'src/shared/core/data-services.abstract';

@Injectable()
export class AuthService {
  constructor(private dataServices: IDataServices) {}

  async signUp(registerDto: RegisterCredentialsDto): Promise<RegisterResponseDto> {
    const { date_of_birth } = registerDto;

    if (!isValidDate({ date: date_of_birth })) {
      throw new NotAcceptableException('Date is not valid');
    }

    return { accessToken: 'ecec' };
  }
}
