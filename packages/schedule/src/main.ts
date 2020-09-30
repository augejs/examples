import { 
  ILogger, 
  boot, 
  GetLogger, 
  Config,
  Module,
  IScanNode} from '@augejs/module-core';

import { ScheduleManager, Schedule } from '@augejs/schedule';

@Module({
  subModules: [
  ]
})
@ScheduleManager()
@Config({
  every5Sec: '*/5 * * * * *'
})
class AppModule {

  @GetLogger()
  logger!:ILogger;

  @Schedule('*/20 * * * * *')
  async every20Sec() {
    this.logger.info('every20Sec tick');
  }

  @Schedule((scanNode: IScanNode) => scanNode.getConfig('every5Sec'))
  async every5SecFromConfig() {
    this.logger.info('every5SecFromConfig tick');
  }

  @Schedule(`*/4 * * * * *`)
  async every4SecWithLongTime() {
    await new Promise(resolve => {
      setTimeout(resolve, 8000);
    });
  }

  async onInit() {
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

