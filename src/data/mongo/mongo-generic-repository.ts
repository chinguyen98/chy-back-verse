import { BaseModel } from 'src/shared/core/base.model';
import { BaseRepository } from 'src/shared/core/base.repository';

export class MongoRepository<T extends BaseModel> extends BaseRepository<T> {}
