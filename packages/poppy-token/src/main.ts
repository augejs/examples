import path from 'path';
import { Module, Logger, ILogger, boot, Config } from '@augejs/module-core';

import { WebServer } from '@augejs/koa';
import { KoaStatic, KoaFavicon, KoaSend } from '@augejs/koa-static';
import { AccessTokenConfig } from '@augejs/poppy-token';
import { RedisConfig } from '@augejs/redis';
import { I18n } from '@augejs/i18n';
import { KoaBodyParserMiddleware } from '@augejs/koa-bodyparser';

import { UserController } from './controllers';

const logger:ILogger = Logger.getLogger('app');

@KoaSend({
  root: path.join(process.cwd(), 'public')
})
@KoaFavicon()
@AccessTokenConfig()
@KoaBodyParserMiddleware()
@I18n()
@RedisConfig({
  keyPrefix: 'poppy-example:',
  host: 'r-bp1fe747f07b6804pd.redis.rds.aliyuncs.com',
  port: 6379,
  password: '123qwe!@#'
})
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

