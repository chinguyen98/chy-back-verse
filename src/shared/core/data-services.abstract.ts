import { User } from 'src/auth/user.model';
import { IGenericRepository } from './generic-repository.abstract';
import { RefreshToken } from 'src/refresh-token/refresh-token.model';

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;
  abstract refreshTokens: IGenericRepository<RefreshToken>;
}
