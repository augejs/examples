import chalk from 'chalk';
import ip from 'ip';

import { Module, Inject, Value} from '@augejs/core';
import { WebServer, IKoaApplication, KOA_WEB_SERVER_IDENTIFIER, RequestMapping } from '@augejs/koa';
import { KoaStatic } from '@augejs/koa-static';


@KoaStatic()
@WebServer({
  host: '0.0.0.0'
})
@Module()
export class WebServerModule {

  @Inject(KOA_WEB_SERVER_IDENTIFIER)
  koa!: IKoaApplication

  @Value()
  config!: Record<string, unknown>

  @RequestMapping.Get('/')
  async test(): Promise<string> {
    return 'hello';
  }

  async onAppDidReady(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const port: number = (this.config.webserver as any).port;

    console.info(
      `
      ${chalk.whiteBright.bold('Http Proxy Server:')}

      - Local:            ${chalk.green.underline(`http://localhost:${port}`)}

      - On Your Network:  ${chalk.green.underline(`http://${ip.address()}:${port}`)}
      `
      );
  }
}
