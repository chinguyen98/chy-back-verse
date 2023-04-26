import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ConfirmEmailDto } from './verification.dto';

@Controller('verification')
// @UseInterceptors(ClassSerializerInterceptor)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('email')
  async confirmEmail(@Body(ValidationPipe) confirmData: ConfirmEmailDto) {
    const email = await this.verificationService.decodeConfirmationToken(confirmData.token);
    await this.verificationService.confirmEmail(email);
  }
}
