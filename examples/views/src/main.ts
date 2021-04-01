import { Module, Logger, ILogger, Inject, boot } from '@augejs/core';
import { VIEWS_IDENTIFIER, RenderFunction, Views} from '@augejs/views';
import path from 'path';

const logger:ILogger = Logger.getLogger('app');

@Views({
  root: path.join(process.cwd(), 'views'),
  minifier: true
})
@Module()
class AppModule {

  @Inject(VIEWS_IDENTIFIER)
  render!: RenderFunction;

  async onInit() {
    logger.info('app onInit');
  }

  async onAppDidReady () {
    logger.info('app onAppDidReady');
    const content: string = await this.render('index.html');
    logger.info(content);
  }
}

async function main() {
  await boot(AppModule);
}

main();

