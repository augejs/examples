import path from 'path';
import chalk from 'chalk';
import ip from 'ip';
import { pathToRegexp } from 'path-to-regexp';

import { Module, Inject, Value, __appRootDirName} from '@augejs/module-core';
import { WebServer, IKoaApplication, KOA_WEB_SERVER_IDENTIFIER, IKoaContext, RequestMapping } from '@augejs/koa';
import { KoaStatic } from '@augejs/koa-static';

interface IProxyRule {
  from: string,
  to: string,
  routeMatch: RegExp,
  routeMatchResults: any[]
}

async function noop(): Promise<void> {}

@KoaStatic()
@WebServer({
  host: '0.0.0.0'
})
@Module()
export class WebServerModule {

  @Inject(KOA_WEB_SERVER_IDENTIFIER)
  koa!: IKoaApplication

  @Value()
  config!: Record<string, any>

  @RequestMapping.Get('/')
  async test() {
    return 'hello';
  }

  async onAppDidReady() {
    const port: number = this.config.webserver.port;

    console.info(
      `
      ${chalk.whiteBright.bold('Http Proxy Server:')}

      - Local:            ${chalk.green.underline(`http://localhost:${port}`)}

      - On Your Network:  ${chalk.green.underline(`http://${ip.address()}:${port}`)}
      `
      );
  }
}
