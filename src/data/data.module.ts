import { Module } from '@nestjs/common';
import { MongoDataModule } from './mongo/mongo-data.module';

@Module({
  imports: [MongoDataModule],
  exports: [MongoDataModule],
})
export class DataModule {}
