import { Inject, Injectable } from '@nestjs/common';
import { RegisterCredentialsDto } from './dto/auth.dto';
import { User } from './models/user.model';
import { ModelType } from 'typegoose';
import { BaseRepository } from 'src/shared/base.repository';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.modelName) private readonly _userModel: ModelType<User>) {}

  async signUp(registerDto: RegisterCredentialsDto) {
    return 'ecec';
  }
}
