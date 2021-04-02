import { Module, ILogger, boot, GetLogger } from '@augejs/core';
import { RedisConnection } from '@augejs/redis';
import { WebServer } from '@augejs/koa';
import { KoaStatic } from '@augejs/koa-static';
import { Log4js } from '@augejs/log4js';
import { YAMLConfig } from '@augejs/file-config';
import { RedisController } from './RedisController';

@RedisConnection()
@Log4js()
@WebServer()
@KoaStatic()
@YAMLConfig()
@Module({
  providers: [
    RedisController
  ]
})
class AppModule {

  @GetLogger()
  logger!: ILogger;

  async onInit() {
    this.logger.info('app onInit');
  }

  async onAppDidReady () {
    this.logger.info('app onAppDidReady');
  }
}

async function main() {
  await boot(AppModule);
}

main();

