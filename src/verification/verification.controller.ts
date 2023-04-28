import { Body, Controller, Post, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { ConfirmEmailDto } from './verification.dto';
import { VerificationService } from './verification.service';

@Controller('verification')
// @UseInterceptors(ClassSerializerInterceptor)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('email')
  async confirmEmail(@Body(ValidationPipe) confirmData: ConfirmEmailDto) {
    try {
      const email = await this.verificationService.decodeConfirmationToken(confirmData.token);
      await this.verificationService.confirmEmail(email);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
