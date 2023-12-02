import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/auth/user.model';
import { RefreshToken } from 'src/refresh-token/refresh-token.model';
import Config from 'src/shared/configs';
import { IDataServices } from 'src/shared/core/data-services.abstract';
import { MongoDataService } from './mongo-data.service';

@Module({
  imports: [
    MongooseModule.forRoot(Config.db.mongoUrl, {
      retryDelay: 500,
      retryAttempts: 3,
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: User.model.schema },
      { name: RefreshToken.name, schema: RefreshToken.model.schema },
    ]),
  ],
  providers: [{ provide: IDataServices, useClass: MongoDataService }],
  exports: [IDataServices],
})
export class MongoDataModule {
  onModuleInit() {
    console.log('MongoDataModule init');
  }
}
