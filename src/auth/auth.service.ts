import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IDataServices } from 'src/shared/core/data-services.abstract';
import { ErrorCode } from 'src/shared/enums/error-code.enum';
import { getDateFromStr, isValidDate } from 'src/shared/libs/daytime';
import { RegisterCredentialsDto, RegisterResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private dataServices: IDataServices) {}

  async signUp(registerDto: RegisterCredentialsDto): Promise<RegisterResponseDto> {
    const { date_of_birth, password, username, email } = registerDto;

    if (!isValidDate({ date: date_of_birth })) {
      throw new NotAcceptableException('Date is not valid');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const dateOfBirth = getDateFromStr(date_of_birth);
    const created_at = new Date();

    try {
      const created_user = await this.dataServices.users.create({
        username,
        password: hashPassword,
        email,
        created_at,
        updated_at: created_at,
        date_of_birth: dateOfBirth,
      });

      console.log({ created_user });
    } catch (err) {
      if (err.code === ErrorCode.CONFLICT_UNIQUE) {
        throw new HttpException('Email is already been used!', HttpStatus.SEE_OTHER);
      }
      throw new InternalServerErrorException();
    }

    return { accessToken: 'ecec' };
  }
}
