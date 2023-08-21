import { Schema } from '@nestjs/mongoose';
import { ReturnModelType, getModelForClass, prop } from '@typegoose/typegoose';
import { Exclude, Expose } from 'class-transformer';
import { BaseModel } from 'src/shared/core/base.model';

@Schema()
@Exclude()
export class User extends BaseModel {
  @prop({ unique: true })
  @Expose()
  public username: string;

  @prop()
  password: string;

  @prop({ unique: true })
  @Expose()
  email: string;

  @prop()
  @Expose()
  date_of_birth: number;

  @prop({})
  @Expose()
  phone_number?: string;

  @prop()
  @Expose()
  firstName?: string;

  @prop()
  @Expose()
  lastName?: string;

  @prop()
  @Expose()
  isVerify?: boolean;

  @prop()
  @Expose()
  fullName?: string = `${this.firstName} ${this.lastName}`;

  @prop()
  salt?: string;

  static get model(): ReturnModelType<typeof User> {
    return getModelForClass(User);
  }
}
