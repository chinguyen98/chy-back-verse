import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

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
}
