import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.model';
import { DB_CONFIG } from 'src/shared/configs';
import { MongoDataService } from './mongo-data.service';
import { IDataServices } from 'src/shared/core/data-services.abstract';

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONFIG.MONGO_URL, {
      retryDelay: 500,
      retryAttempts: 3,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [{ provide: IDataServices, useClass: MongoDataService }],
  exports: [IDataServices],
})
export class MongoDataModule {}
