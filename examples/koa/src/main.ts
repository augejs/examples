import { 
  ILogger, 
  boot, 
  GetLogger, 
  Value,
  Module,
  IScanNode
} from '@augejs/core';

import {
  WebServer,
  RequestMapping,
  } from '@augejs/koa';

import { ModuleA } from './moduleA/ModuleA';

@WebServer()
@Module({
  subModules: [
    ModuleA,
  ]
})
class AppModule {

  @GetLogger()
  logger!:ILogger;

  @Value()
  globalConfig!:Record<string, unknown>;

  async onInit(scanNode: IScanNode) {
    this.logger.info('app on onInit ' + JSON.stringify(scanNode.getConfig('/'), undefined, 2));
  }

  async onAppWillReady() {
    this.logger.info('app on onAppWillReady');
  }

  async onAppDidReady() {
    this.logger.info('app on onAppDidReady');
  }

  @RequestMapping.Get('/')
  async home() {
    return 'koa web server'
  }

  @RequestMapping.Get('/ping')
  async ping() {
    return 'pong'
  }
}

async function main() {
  await boot(AppModule);
}

main();
