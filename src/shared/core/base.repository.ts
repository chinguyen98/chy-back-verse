import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InstanceType, ModelType, Typegoose } from 'typegoose';

@Injectable()
export abstract class BaseRepository<T extends Typegoose> {
  protected _model: ModelType<T>;
}
