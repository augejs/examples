import {
  ILogger, 
  GetLogger, 
  Module,
} from '@augejs/module-core';

import { UserController } from './controllers';
import * as Entities from './entities';

import { getConnection } from '@augejs/typeorm';

@Module({
  providers: [
    UserController
  ]
})
export class UserModule {
  static Entities = Entities

  @GetLogger()
  logger!:ILogger;

  async onInit() {

    console.log('1231313131');

    this.logger.info('user module onInit');

    // this.logger.info(JSON.stringify(getConnection().manager.find(Entities.User)));
  }
}
