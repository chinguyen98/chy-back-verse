import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/models/user.model';
import { DB_CONFIG } from 'src/shared/configs';
import { IDataServices } from 'src/shared/core/abstracts/data-services.abstract';
import { MongoDataService } from './mongo-data.service';

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
