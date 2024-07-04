import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import type { EMAIL_VERIFICATION_PAYLOAD } from 'src/shared/types/user';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private jwtService: JwtService) {}

  private async sendEmail(
    template: string,
    subject: string,
    email: string,
    context: Record<string, string>
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        subject,
        from: 'Discochy',
        to: email,
        template,
        context,
      });
    } catch (err) {
      console.error(err);
    }
  }

  public async sendVerifyAccountEmail(email: string, username: string) {
    const payload: EMAIL_VERIFICATION_PAYLOAD = { email };

    const token = this.jwtService.sign(payload);

    const url = `?token=${token}`;

    await this.sendEmail('verify-account', 'Verify your account on Discochy', email, {
      username,
      url,
    });
  }
}
