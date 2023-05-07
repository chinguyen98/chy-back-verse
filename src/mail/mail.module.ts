import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import Config from 'src/shared/configs';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: Config.mailer.host,
        port: Config.mailer.port,
        secure: false,
        auth: {
          user: Config.mailer.username,
          pass: Config.mailer.password,
        },
      },
      defaults: {
        from: Config.mailer.username,
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
