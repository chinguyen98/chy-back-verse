import { Schema } from '@nestjs/mongoose';
import { Ref, ReturnModelType, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from 'src/auth/user.model';
import { BaseModel } from 'src/shared/core/base.model';

@Schema()
export class RefreshToken extends BaseModel {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop()
  token: string;

  @prop()
  expired_time: number;

  @prop()
  created_by_id: string;

  @prop()
  revoked_time: number;

  @prop()
  revoked_by_id: string;

  @prop()
  replaced_by_id: string;

  @prop()
  public get isExpired() {
    return new Date().getTime() > this.expired_time;
  }

  @prop()
  public get isActive() {
    return !this.isExpired && !this.revoked_time;
  }

  static get model(): ReturnModelType<typeof RefreshToken> {
    return getModelForClass(RefreshToken);
  }
}
