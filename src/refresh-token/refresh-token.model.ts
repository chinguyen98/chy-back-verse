import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class RefreshToken {}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
