import { SchemaFactory } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { BaseModel } from 'src/shared/core/base.model';

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

  @prop({})
  @Expose()
  phonenumber: string;

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
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
