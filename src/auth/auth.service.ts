import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IDataServices } from 'src/shared/core/data-services.abstract';
import { ErrorCode } from 'src/shared/enums/error-code.enum';
import { getDateFromStr, isValidDate } from 'src/shared/libs/daytime';
import { RegisterCredentialsDto, AuthResponseDto, SigninCredentialsDto } from './auth.dto';
import { ACCESS_TOKEN_PAYLOAD } from 'src/shared/types/user';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(private dataServices: IDataServices, private jwtService: JwtService) {}

  async signUp(registerDto: RegisterCredentialsDto): Promise<AuthResponseDto> {
    const { date_of_birth, password, username, email, phone_number } = registerDto;

    if (!isValidDate({ date: date_of_birth })) {
      throw new NotAcceptableException('Date is not valid');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const dateOfBirth = getDateFromStr(date_of_birth);
    const created_at = new Date();

    let created_user: User;
    try {
      created_user = await this.dataServices.users.create({
        username,
        password: hashPassword,
        email,
        created_at,
        updated_at: created_at,
        date_of_birth: dateOfBirth,
        phone_number,
      });

      console.log(`Create user ${created_user.username} successfully!`);
    } catch (err) {
      if (err.code === ErrorCode.CONFLICT_UNIQUE) {
        throw new HttpException('Email is already been used!', HttpStatus.SEE_OTHER);
      }
      throw new InternalServerErrorException();
    }

    const accessTokenPayload: ACCESS_TOKEN_PAYLOAD = { username, sub: created_user.id };
    return { accessToken: await this.jwtService.signAsync(accessTokenPayload) };
  }

  async signIn(user: User): Promise<AuthResponseDto> {
    const accessTokenPayload: ACCESS_TOKEN_PAYLOAD = { username: user.username, sub: user.id };
    return { accessToken: await this.jwtService.signAsync(accessTokenPayload) };
  }

  async validateUser({ username, password }: SigninCredentialsDto): Promise<any> {
    const user = await this.dataServices.users.getBy({
      $or: [{ email: username }, { phone_number: username }],
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
