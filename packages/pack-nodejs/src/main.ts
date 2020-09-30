import path from 'path';

import { Module, Logger, ILogger, boot, Cluster, LifecycleOnAppWillCloseHook, IScanNode, __appRootDirName } from '@augejs/module-core';

import { RequestMapping, WebServer } from '@augejs/koa';
import { KoaStatic, KoaFavicon, KoaSend } from '@augejs/koa-static';
import { I18n } from '@augejs/i18n';
import { KoaBodyParserMiddleware } from '@augejs/koa-bodyparser';

import { UserController } from './controllers';

const logger:ILogger = Logger.getLogger('app');


// https://github.com/vercel/pkg
// https://jingsam.github.io/2018/03/02/pkg.html
// https://github.com/vercel/pkg/issues/74

@LifecycleOnAppWillCloseHook(async (scanNode: IScanNode, next: Function) => {
  logger.info('hook: 5s later the master will to be closed');
  await new Promise((resolve: Function) => {
    setTimeout(()=>{
      logger.info('hook: master onAppWillClose');
      resolve();
    }, 5000)
  })
  
  await next();
})
@Module()
class ClusterModule {
  async onAppDidReady() {
    logger.info('master onAppDidReady');
  }

  async onAppWillClose() {
    await new Promise((resolve: Function) => {
      logger.info('5s later the master will to be closed');
      setTimeout(()=>{
        logger.info('master onAppWillClose');
        resolve();
      }, 5000)
    })
  }
}

@Cluster({
  workers: 0,
  clusterModule: ClusterModule,
})
@KoaSend({
  root: path.join(__appRootDirName, 'public')
})
@KoaFavicon()
@KoaBodyParserMiddleware()
@I18n({
  root: path.join(__appRootDirName, 'locales'),
  defaultLocale: 'zh',
})
@KoaStatic({
  prefix: '/public',
  dir: path.join(__appRootDirName, 'public')
})
@WebServer({
  host: '0.0.0.0'
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
    logger.info('app onAppDidReady');
    logger.info(`app env: ${process.env.NODE_ENV}`);
    logger.info('title: ' + process.title);
  }

  async onAppWillClose() {
    await new Promise((resolve: Function)=>{
      setTimeout(()=>{
        logger.info('onAppWillClose');
        resolve();
      }, 1000)
    })
  }

  @RequestMapping.Get('/ping')
  async ping() {
    return 'pong';
  }

}

async function main() {
  await boot(AppModule);
}

main();

