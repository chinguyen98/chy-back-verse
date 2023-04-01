import { Expose } from 'class-transformer';
import { BaseModel } from 'src/shared/base.model';
import { ModelType, prop } from 'typegoose';

export class User extends BaseModel<User> {
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
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static get model(): ModelType<User> {
    return new User().getModelForClass(User);
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel() {
    return new this.model();
  }
}
