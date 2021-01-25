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

@HostMiddleware()
class ClassMiddleware {

  @GetLogger()
  logger!:ILogger;

  async use(context: IKoaContext, next: Function) {
    this.logger.info('========>>>>>HostMiddleware 1');
    await next();
    this.logger.info('========>>>>>HostMiddleware 2');
  }
}

@Prefix('/module')
@Middleware(
  async (context: IKoaContext, next: Function) => {
    console.log('========>>>>>1 start');
    await next();
    console.log('========>>>>>1 end');
  }
)
@Module({
  providers: [
    ClassMiddleware,
  ]
})
class Module1 {
  @GetLogger()
  logger!:ILogger;

  @RequestMapping()
  @Middleware(
    async (context: IKoaContext, next: Function) => {
      console.log('========>>>>>2 start');
      await next();
      console.log('========>>>>>2 end');
    }
  )
  test(@RequestParams.Context() context: IKoaContext) {
    this.logger.info(`route test ${context}`);
    return {
      name: 'hello'
    }
  }
}

@WebServer()
@Module({
  subModules: [
    Module1,
  ]
})
class AppModule {

  @GetLogger()
  logger!:ILogger;

  @Value('/')
  globalConfig!:object;

  async onInit(scanNode: IScanNode) {
    this.logger.info('app on onInit' + JSON.stringify(scanNode.getConfig('/')));
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
