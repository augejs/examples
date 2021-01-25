import { Module, Logger, ILogger, Inject, boot } from '@augejs/core';
import { REDIS_IDENTIFIER, Commands, RedisConfig } from '@augejs/redis';

const logger:ILogger = Logger.getLogger('app');

@RedisConfig({
  host: 'xxxxxx',
  port: 6379,
  password: 'cccccc'
})
@Module()
class AppModule {

  @Inject(REDIS_IDENTIFIER)
  redis!: Commands;

  async onInit() {
    logger.info('app onInit');
  }

  async onAppDidReady () {
    logger.info('app onAppDidReady');

    this.redis.set('hello', 'world');
  }
}

async function main() {
  await boot(AppModule);
}

main();

