import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

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

      console.log('Send mail successfully!');
    } catch (err) {
      console.error(err);
    }
  }

  public async sendVerifyAccountEmail(email: string, username: string, code: string) {
    await this.sendEmail('verify-account', 'Verify your account on Fine Social', email, {
      username,
      code,
    });
  }
}
