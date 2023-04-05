import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { IGenericRepository } from './generic-repository.abstract';
import { BaseModel } from './base.model';

export abstract class BaseRepository<T extends BaseModel> implements IGenericRepository<T> {
  private _model: ReturnModelType<AnyParamConstructor<T>>;

  constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
    this._model = model;
  }

  async get(id: string): Promise<T> {
    return await this._model.findById(id);
  }

  async update(id: string, item: T): Promise<T> {
    return await this._model.findByIdAndUpdate(id, item);
  }

  async create(item: T): Promise<any> {
    console.log('ececececec', item);
    return await this._model.create(item);
  }

  async getAll(): Promise<T[]> {
    return await this._model.find();
  }
}
