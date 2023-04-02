import { ModelType, Typegoose, prop } from 'typegoose';
import { Expose } from 'class-transformer';

export abstract class BaseModel<T> extends Typegoose {
  @prop()
  @Expose()
  id: string;

  @prop()
  @Expose()
  created_at: Date;

  @prop()
  @Expose()
  updated_at: Date;
}
