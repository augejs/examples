import { Module, Logger, ILogger, boot } from '@augejs/core';
import { MailTransport } from '@augejs/mail';
import { WebServer, RequestMapping, RequestParams, IKoaContext } from '@augejs/koa';
import { KoaStatic } from '@augejs/koa-static';
import { Log4js } from '@augejs/log4js';
import { YAMLConfig } from '@augejs/file-config';
import { MailController } from './MailController';


const logger:ILogger = Logger.getLogger('app');

@MailTransport({})
@Log4js()
@WebServer()
@KoaStatic()
@YAMLConfig()
@Module({
  providers: [
    MailController,
  ]
})
class AppModule {

  async onInit() {
    logger.info('app onInit');
  }

  async onAppDidReady () {
    logger.info('app onAppDidReady');
  }

  @RequestMapping.Get('/')
  home(@RequestParams.Context() context: IKoaContext) {
    context.redirect('/public/apidoc/index.html');
  }
}

async function main() {
  await boot(AppModule);
}

main();

