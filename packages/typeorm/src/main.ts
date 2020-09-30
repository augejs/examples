import { Module, Logger, ILogger, boot, Config } from '@augejs/module-core';

import { WebServer } from '@augejs/koa';
import { KoaStatic, KoaFavicon, KoaSend } from '@augejs/koa-static';
import { AccessTokenConfig } from '@augejs/poppy-token';
import { RedisConfig } from '@augejs/redis';
import { I18n } from '@augejs/i18n';
import { KoaBodyParserMiddleware } from '@augejs/koa-bodyparser';

import { UserController } from './modules/user/controllers';

const logger:ILogger = Logger.getLogger('app');

@KoaBodyParserMiddleware()
@KoaStatic({
  prefix: '/public'
})
@WebServer({
  port: 3003
})
@Module({
  providers: [
    UserController
  ]
})
class AppModule {

  async onInit() {
    logger.info('app onInit');
  }

  async onAppDidReady () {
  }
}

async function main() {
  await boot(AppModule);
}

main();

