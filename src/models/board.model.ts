import { Schema } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { BaseModel } from 'src/shared/core/base.model';

@Schema()
export class Board extends BaseModel {
  @prop()
  @Expose()
  name: string;

  @prop()
  @Expose()
  img: string;

  @prop()
  @Expose()
  is_private: boolean;

  @prop()
  @Expose()
  owner_id: boolean;

  @prop()
  @Expose()
  is_mute: boolean;
}
