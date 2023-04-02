import { prop } from '@typegoose/typegoose';

export abstract class BaseModel {
  @prop()
  id: string;

  @prop()
  created_at: Date;

  @prop()
  updated_at: Date;
}
