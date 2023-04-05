import { BaseModel } from './base.model';

export abstract class IGenericRepository<T extends BaseModel> {
  abstract getAll(): Promise<T[]>;

  abstract get(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T): Promise<T>;
}
