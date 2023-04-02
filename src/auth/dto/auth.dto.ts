import {
  IsDateString,
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
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

  @IsString()
  date: string;
}

export class RegisterResponseDto {
  accessToken: string;
}
