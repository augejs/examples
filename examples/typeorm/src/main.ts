import { Module, ILogger, boot, GetLogger, Inject } from '@augejs/core'
import { IKoaContext, RequestMapping, RequestParams, WebServer } from '@augejs/koa'
import { Typeorm } from '@augejs/typeorm'
import { KoaStatic } from '@augejs/koa-static';
import { Log4js } from '@augejs/log4js';
import { YAMLConfig } from '@augejs/file-config';
import { UserRepository } from './repositories/UserRepository';
import { UserController } from './controllers/UserController';
import { SnowflakeService } from './services/SnowflakeService';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'production';

@WebServer()
@Typeorm({
  synchronize: process.env.NODE_ENV === 'development'
})
@Log4js()
@KoaStatic()
@YAMLConfig()
@Module({
  providers: [
    UserController,
    UserRepository,
    SnowflakeService,
  ]
})
class AppModule {

  @GetLogger()
  logger!: ILogger;

  @Inject(UserRepository)
  userRepository!:UserRepository

  async onInit() {
    this.logger.info('app onInit');
  }

  async onAppDidReady () {
    this.logger.info('app onAppDidReady');

    const users = await this.userRepository.findAllUsers();
    this.logger.info(JSON.stringify(users));    
  }

  @RequestMapping.Get('/')
  async home(@RequestParams.Context() context: IKoaContext) {
    context.redirect('/public/apidoc/index.html');
  }
}

async function main() {
  await boot(AppModule);
}

main();

