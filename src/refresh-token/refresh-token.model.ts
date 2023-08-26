import { Schema } from '@nestjs/mongoose';
import { plugin, ReturnModelType, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from 'src/auth/user.model';
import * as autopopulate from 'mongoose-autopopulate';
import { BaseModel } from 'src/shared/core/base.model';

@Schema()
@plugin(autopopulate as any)
export class RefreshToken extends BaseModel {
  @prop({
    ref: () => User,
    autopopulate: true,
  })
  user!: User;

  @prop()
  token: string;

  @prop()
  expired_time?: number;

  @prop()
  created_by_ip?: string;

  @prop()
  revoked_time?: number;

  @prop()
  revoked_by_ip?: string;

  @prop()
  replaced_by_token?: string;

  isTokenExpired?(): boolean | undefined {
    return new Date().getTime() > this.expired_time;
  }

  isTokenActive?(): boolean | undefined {
    return !this.isTokenExpired() && !this.revoked_time;
  }

  static get model(): ReturnModelType<typeof RefreshToken> {
    return getModelForClass(RefreshToken);
  }
}
