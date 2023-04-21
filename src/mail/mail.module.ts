import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MAILER_CONFIG } from 'src/shared/configs';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: MAILER_CONFIG.HOST,
        port: +MAILER_CONFIG.PORT,
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
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class MailModule {}
