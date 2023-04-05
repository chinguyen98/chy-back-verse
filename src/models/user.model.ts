import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { BaseModel } from 'src/shared/core/base.model';

@Schema()
export class User extends BaseModel {
  @prop({ unique: true })
  @Expose()
  username: string;

  @prop()
  @Expose()
  password: string;

  @prop()
  @Expose()
  email: string;

  @prop()
  @Expose()
  date_of_birth: Date;

  @prop({})
  @Expose()
  phonenumber?: string;

  @prop()
  @Expose()
  firstName?: string;

  @prop()
  @Expose()
  lastName?: string;

  @prop()
  @Expose()
  isVerify?: string;

  @prop()
  @Expose()
  fullName?: string = `${this.firstName} ${this.lastName}`;
}

export const UserSchema = SchemaFactory.createForClass(User);
