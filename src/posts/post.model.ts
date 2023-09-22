import { prop } from '@typegoose/typegoose';
import { User } from 'src/auth/user.model';
import { BaseModel } from 'src/shared/core/base.model';

export class Post extends BaseModel {
  @prop({
    ref: () => User,
    autopopulate: true,
  })
  user!: User;

  @prop()
  title: string;

  @prop()
  text: string;
}
