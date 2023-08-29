import { ReturnModelType } from '@typegoose/typegoose';
import { BaseModel } from './base.model';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

export abstract class IGenericRepository<T extends BaseModel> {
  abstract base(): Promise<ReturnModelType<AnyParamConstructor<T>>>;

  abstract getBy(filter: object): Promise<T>;

  abstract getAll(): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: Partial<T>): Promise<T>;
}
