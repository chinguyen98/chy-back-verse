import { BaseRepository } from 'src/shared/core/base.repository';
import { Typegoose } from 'typegoose';

export class MongoGenericRepository<T extends Typegoose> extends BaseRepository<T> {}
