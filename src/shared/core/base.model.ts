import { Schema } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export abstract class BaseModel {
  @prop({ default: uuidv4() })
  id?: string;

  @prop()
  created_at: Date;

  @prop()
  updated_at: Date;
}
