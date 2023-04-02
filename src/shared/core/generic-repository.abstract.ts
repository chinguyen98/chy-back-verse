import { BaseModel } from './base.model';

export abstract class IGenericRepository<T extends BaseModel> {
  abstract getAll(): Promise<T[]>;
}
