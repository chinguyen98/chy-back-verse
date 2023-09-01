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
import { User } from 'src/auth/user.model';
import { MailService } from 'src/mail/mail.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { IDataServices } from 'src/shared/core/data-services.abstract';
import { ErrorCode } from 'src/shared/enums/error-code.enum';
import { getUnixtimeFromStr, isValidDate } from 'src/shared/libs/daytime';
import { TOKEN_PAYLOAD } from 'src/shared/types/user';
import { AuthResponseDto, RegisterCredentialsDto, SigninCredentialsDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  async signUp(registerDto: RegisterCredentialsDto): Promise<AuthResponseDto> {
    const { date_of_birth, password, username, email, phone_number, firstName, lastName } =
      registerDto;

    if (!isValidDate({ date: date_of_birth })) {
      throw new NotAcceptableException('Date is not valid');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const dateOfBirth = getUnixtimeFromStr(date_of_birth);

    let created_user: User;
    try {
      created_user = await this.dataServices.users.create({
        username,
        password: hashPassword,
        email,
        date_of_birth: dateOfBirth,
        phone_number,
        isVerify: false,
        firstName,
        lastName,
      });
    } catch (err) {
      if (err.code === ErrorCode.CONFLICT_UNIQUE) {
        throw new HttpException(
          `Your ${Object.keys(err?.keyPattern)[0]} is already been used!`,
          HttpStatus.CONFLICT
        );
      }
      throw new InternalServerErrorException();
    }

    await this.mailService.sendVerifyAccountEmail(created_user.email, created_user.username);

    return this.generateAccessAndRefreshToken(username);
  }

  async signIn(user: User): Promise<AuthResponseDto> {
    return this.generateAccessAndRefreshToken(user.username);
  }

  async validateUser({ username, password }: SigninCredentialsDto): Promise<any> {
    const user = await this.dataServices.users.getBy({
      $or: [{ email: username }, { phone_number: username }, { username }],
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.dataServices.users.getBy({ $or: [{ username }] });
    return user;
  }

  async generateAccessAndRefreshToken(username: string): Promise<AuthResponseDto> {
    const accessTokenPayload: TOKEN_PAYLOAD = { username };

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.refreshTokenService.generateRefreshToken(username),
    };
  }

  async generateAccessToken(username: string): Promise<string> {
    const accessTokenPayload: TOKEN_PAYLOAD = { username };
    return await this.jwtService.signAsync(accessTokenPayload);
  }
}
