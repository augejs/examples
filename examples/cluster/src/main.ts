import { 
  ILogger, 
  boot, 
  GetLogger, 
  Module,
  IScanNode,
  Cluster,
} from '@augejs/core';

import {
  WebServer,
  RequestMapping,
  } from '@augejs/koa';

@Cluster({
  workers: 2
}) 
@WebServer()
@Module()
class AppModule {

  @GetLogger()
  logger!:ILogger;

  @RequestMapping.Get()
  async api() {
    this.logger.info('api');
    return '----';
  }

  async onInit(scanNode: IScanNode) {
    this.logger.info('app on onInit');
  }

  async onAppWillReady() {
    this.logger.info('app on onAppWillReady');
  }

  async onAppDidReady() {
    this.logger.info('app on onAppDidReady');
  }
}

async function main() {
  await boot(AppModule);
}

main();
