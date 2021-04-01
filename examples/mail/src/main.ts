import { Module, Logger, ILogger, Inject, boot } from '@augejs/core';
import { MAIL_IDENTIFIER , MailTransport, Mail } from '@augejs/mail';

const logger:ILogger = Logger.getLogger('app');

@MailTransport({
  host: "smtp.163.com",
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'xxxx@163.com', // generated ethereal user
    pass: 'xxxx', // generated ethereal password
  },
})
@Module()
class AppModule {

  @Inject(MAIL_IDENTIFIER)
  mail!: Mail;

  async onInit() {
    logger.info('app onInit');
  }

  async onAppDidReady () {
    logger.info('app onAppDidReady');

    const results = await this.mail.sendMail({
      from: '"Fred Foo 👻" <xxxxx@163.com>', // sender address
      to: "xxxx@163.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    logger.info(results);
  }
}

async function main() {
  await boot(AppModule);
}

main();

