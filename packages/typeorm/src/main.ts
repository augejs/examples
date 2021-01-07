import { Module, Logger, ILogger, boot, Config, GetLogger } from '@augejs/module-core';

import { WebServer } from '@augejs/koa';
import { Typeorm } from '@augejs/typeorm';

import { getConnection } from '@augejs/typeorm';

import { UserModule } from './modules/user/User.module';
@WebServer({
  port: 3003
})
@Typeorm({
  name: 'boss',
  type: 'mysql',
  host: 'rm-uf6q042ewut07i6b82m.mysql.rds.aliyuncs.com',
  port: 3306,
  database: 'boss',
  username: 'huser',
  password: 'nKmjc3CT6aThlMer',
  entities: [
    ...Object.values(UserModule.Entities),
  ],
  synchronize: true,
  logging: false,
})
@Module({
  subModules: [
    UserModule
  ],
})
class AppModule {

  @GetLogger()
  logger!: ILogger;

  async onInit() {
    this.logger.info('app onInit');
  }

  async onAppDidReady () {
    this.logger.info('app onAppDidReady');

    this.logger.info(JSON.stringify(getConnection('boss').manager.find(UserModule.Entities.User)));
  }
}

async function main() {
  await boot(AppModule);
}

main();

