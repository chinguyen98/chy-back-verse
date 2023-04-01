import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.modelName, schema: User.model.schema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
