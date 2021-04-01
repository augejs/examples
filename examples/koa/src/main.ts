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
  Middleware, 
  HostMiddleware,
  Prefix, 
  RequestMapping,
  RequestParams,
  IKoaContext,
  } from '@augejs/koa';

import { ModuleA } from './moduleA/ModuleA';

// @Prefix('/module')
// @Middleware(
//   async (_, next: CallableFunction) => {
//     console.log('========>>>>>1 start');
//     await next();
//     console.log('========>>>>>1 end');
//   }
// )
// @Module({
//   providers: [
//     ClassMiddleware,
//   ]
// })
// class Module1 {
//   @GetLogger()
//   logger!:ILogger;

//   @RequestMapping.All()
//   @Middleware(
//     async (_, next: CallableFunction) => {
//       console.log('========>>>>>2 start');
//       await next();
//       console.log('========>>>>>2 end');
//     }
//   )
//   test(@RequestParams.Context() context: IKoaContext) {
//     this.logger.info(`route test ${context}`);
//     return {
//       name: 'hello'
//     }
//   }
// }

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
