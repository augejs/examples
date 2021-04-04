import { GetLogger, ILogger, Inject, Provider } from "@augejs/core";
import { Prefix, RequestMapping } from '@augejs/koa';
import { Mail, MAIL_IDENTIFIER } from "@augejs/mail";

@Prefix('mail')
@Provider()
export class MailController {

  @GetLogger()
  logger!: ILogger;

  @Inject(MAIL_IDENTIFIER)
  mail!: Mail;
  
  /**
   * @api {post} /mail/send send email
   *
   * @apiGroup Mail
   *
   * @apiSampleRequest /mail/send
   */

   @RequestMapping.Post()
   async send(): Promise<string> {

    const results = await this.mail.sendMail({
      from: '"Fred Foo 👻" <alex_20190502@163.com>', // sender address
      to: "alex_20190502@163.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    })

    return results;
   }

}
