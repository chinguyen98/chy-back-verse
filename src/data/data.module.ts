import { Global, Module } from '@nestjs/common';
import { MongoDataModule } from './mongo/mongo-data.module';

@Global()
@Module({
  imports: [MongoDataModule],
  exports: [MongoDataModule],
})
export class DataModule {}
