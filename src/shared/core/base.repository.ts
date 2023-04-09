import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { IGenericRepository } from './generic-repository.abstract';
import { BaseModel } from './base.model';

export class BaseRepository<T extends BaseModel> implements IGenericRepository<T> {
  private _model: ReturnModelType<AnyParamConstructor<T>>;

  constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
    this._model = model;
  }

  async getBy(filter = {}): Promise<any> {
    try {
      return await this._model.findOne(filter);
    } catch (err) {}
  }

  async getById(id: string): Promise<T> {
    return await this._model.findById(id);
  }

  async update(id: string, item: T): Promise<T> {
    return await this._model.findByIdAndUpdate(id, item);
  }

  async create(item: T): Promise<any> {
    return this._model.create(item);
  }

  async getAll(): Promise<T[]> {
    return await this._model.find();
  }
}
