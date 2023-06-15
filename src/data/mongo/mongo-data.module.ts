import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/auth/user.model';
import Config from 'src/shared/configs';
import { IDataServices } from 'src/shared/core/data-services.abstract';
import { MongoDataService } from './mongo-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: User.model.schema }]),
    MongooseModule.forRoot(Config.db.mongoUrl, {
      retryDelay: 500,
      retryAttempts: 3,
    }),
  ],
  providers: [{ provide: IDataServices, useClass: MongoDataService }],
  exports: [IDataServices],
})
export class MongoDataModule {}
