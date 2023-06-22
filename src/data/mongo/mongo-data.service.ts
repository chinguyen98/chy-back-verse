import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/user.model';
import { MongoRepository } from './mongo-generic-repository';
import { ReturnModelType } from '@typegoose/typegoose';
import { IDataServices } from 'src/shared/core/data-services.abstract';
import { RefreshToken } from 'src/refresh-token/refresh-token.model';

@Injectable()
export class MongoDataService implements OnApplicationBootstrap, IDataServices {
  users: MongoRepository<User>;
  refreshTokens: MongoRepository<RefreshToken>;

  constructor(
    @InjectModel(User.name) private readonly _userModel: ReturnModelType<typeof User>,
    @InjectModel(RefreshToken.name)
    private readonly _refreshTokenModel: ReturnModelType<typeof RefreshToken>
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoRepository<User>(this._userModel);
    this.refreshTokens = new MongoRepository<RefreshToken>(this._refreshTokenModel);
  }
}
