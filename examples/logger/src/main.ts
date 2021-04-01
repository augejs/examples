/**
 * Usage:
 * 
 * npm install @augejs/core @augejs/log4js reflect-metadata -S
 * 
 */

import { Module, Logger, ILogger, boot } from '@augejs/core';

import { Log4js } from '@augejs/log4js';

const logger:ILogger = Logger.getLogger('app');

@Log4js()
@Module()
class AppModule {

  async onInit() {
    logger.info('app on onInit');
  }
}

async function main() {
  await boot(AppModule);
}

main();
