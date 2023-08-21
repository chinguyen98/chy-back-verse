import { Schema } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Exclude, Expose, Transform } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export abstract class BaseModel {
  @Transform((value) => {
    if ('value' in value) {
      return value.obj[value.key].toString();
    }

    return 'unknown value';
  })
  public _id?: string;

  public __v?: number;

  @prop({ default: uuidv4() })
  @Expose()
  id?: string;

  @prop({ default: new Date().getTime() })
  @Expose()
  created_at?: number;

  @prop({ default: new Date().getTime() })
  @Expose()
  updated_at?: number;
}
