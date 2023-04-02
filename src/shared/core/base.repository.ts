import { ModelType, Typegoose } from 'typegoose';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class BaseRepository<T extends Typegoose> implements IGenericRepository<T> {
  private _model: ModelType<T>;

  constructor(model: ModelType<T>) {
    this._model = model;
  }

  getAll(): Promise<T[]> {
    return this._model.find().exec();
  }

  get(id: any): Promise<T> {
    return this._model.findById(id).exec();
  }

  create(item: T): Promise<T> {
    return this._model.create(item);
  }

  update(id: string, item: T) {
    return this._model.findByIdAndUpdate(id, item);
  }
}
