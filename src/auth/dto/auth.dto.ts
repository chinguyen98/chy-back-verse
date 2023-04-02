import {
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class RegisterCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsNumberString()
  day: string;

  @IsNumberString()
  month: string;

  @IsNumberString()
  year: string;
}

export class RegisterResponseDto {
  accessToken: string;
}
