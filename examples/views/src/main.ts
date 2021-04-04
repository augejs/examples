import { Module, ILogger, boot, GetLogger } from '@augejs/core';
import { Views } from "@augejs/views";
import { WebServer } from '@augejs/koa';
import { ViewController } from './controllers/ViewController';

@Views()
@Module({
  providers: [ ViewController ]
})
@WebServer()
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

