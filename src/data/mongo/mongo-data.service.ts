import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/models/user.model';
import { IDataServices } from 'src/shared/core/abstracts/data-services.abstract';
import { MongoRepository } from './mongo-generic-repository';
import { ReturnModelType } from '@typegoose/typegoose';

export class MongoDataService implements OnApplicationBootstrap, IDataServices {
  users: MongoRepository<User>;

  constructor(@InjectModel(User.name) private readonly _userModel: ReturnModelType<typeof User>) {}

  onApplicationBootstrap() {
    this.users = new MongoRepository<User>(this._userModel);
  }
}
