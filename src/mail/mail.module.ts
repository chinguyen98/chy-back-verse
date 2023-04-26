import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MAILER_CONFIG } from 'src/shared/configs';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: MAILER_CONFIG.HOST,
        port: MAILER_CONFIG.PORT,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: MAILER_CONFIG.USERNAME,
          pass: MAILER_CONFIG.PASSWORD,
        },
      },
      defaults: {
        from: MAILER_CONFIG.USERNAME,
      },
      preview: false,
      template: {
        dir: process.cwd() + '/src/mail/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
