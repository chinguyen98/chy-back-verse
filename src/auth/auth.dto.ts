import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsString()
  date_of_birth: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class SigninCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class AuthResponseDto {
  accessToken: string;
  refreshToken?: string;
}
