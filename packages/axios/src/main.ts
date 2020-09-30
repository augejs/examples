

import { Module, ILogger, Inject, boot, GetLogger } from '@augejs/module-core';
import { AXIOS_IDENTIFIER, AxiosConfig, AxiosInstance } from '@augejs/axios';

@Module()
@AxiosConfig()
class AppModule {

  @Inject(AXIOS_IDENTIFIER)
  httpService!: AxiosInstance;

  @GetLogger()
  logger!: ILogger;

  async onInit() {
    this.logger.info('app on onInit');

    const results = await this.httpService.get('http://www.baidu.com');
    this.logger.info(results.data);
  }
}

async function main() {
  await boot(AppModule);
}

main();

