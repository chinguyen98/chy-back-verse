import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/models/user.model';
import { IDataServices } from 'src/shared/core/abstracts/data-services.abstract';
import { ModelType } from 'typegoose';
import { MongoGenericRepository } from './mongo-generic-repository';

export class MongoDataService implements OnApplicationBootstrap, IDataServices {
  users: MongoGenericRepository<User>;

  constructor(@InjectModel(User.modelName) private readonly _userModel: ModelType<User>) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this._userModel);
  }
}
