import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image:optimize',
      prefix: 'flash-cards',
    }),
  ],
})
export class MediaModule {}
