import { User } from 'src/auth/models/user.model';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;
}
