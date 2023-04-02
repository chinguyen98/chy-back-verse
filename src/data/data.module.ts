import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONFIG } from 'src/shared/configs';

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONFIG.MONGO_URL, {
      retryDelay: 500,
      retryAttempts: 3,
    }),
  ],
})
export class DataModule {}
