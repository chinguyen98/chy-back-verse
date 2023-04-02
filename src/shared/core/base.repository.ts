import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { IGenericRepository } from './generic-repository.abstract';
import { BaseModel } from './base.model';

export abstract class BaseRepository<T extends BaseModel> implements IGenericRepository<T> {
  private _model: ReturnModelType<AnyParamConstructor<T>>;

  constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
    this._model = model;
  }
  getAll(): Promise<T[]> {
    return this._model.find();
  }
}
