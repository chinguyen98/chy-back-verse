import { User } from 'src/auth/user.model';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;
}
