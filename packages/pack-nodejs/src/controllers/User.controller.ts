import { Provider, Inject, Logger, GetLogger, ILogger } from '@augejs/core';
import { Prefix, RequestMapping, RequestParams , IKoaContext} from '@augejs/koa';
import { I18N_IDENTIFIER, II18n } from '@augejs/i18n';

@Provider()
@Prefix('user')
export class UserController {

  @Inject(I18N_IDENTIFIER)
  i18n!: II18n;

  @GetLogger('user')
  logger!: ILogger

  /**
   * @api {post} /user/login Request User information
   * @apiGroup User
   *
   * @apiParam {Number} userId Users unique ID.
   *
   * 
   * @apiSampleRequest /user/login
   * 
   */
  @RequestMapping.Post()
  async login(
    @RequestParams.Body('userId') userId: string, 
    @RequestParams.Context() ctx: IKoaContext
    ) {

    return {
      userId,
      ip: ctx.ip
    }
  }

  /**
   * @api {get} /user/login Request User information
   * @apiGroup User
   *
   * @apiParam {Number} userName User name.
   *
   * 
   * @apiSampleRequest /user/hello
   * 
   */
  @RequestMapping.Get()
  async hello(
    @RequestParams.Query('userName') userName: string, 
    @RequestParams.Context() ctx: IKoaContext
    ) {

    this.logger.info('hello')

    return {
      hello: this.i18n.get('zh').formatMessage({id: 'hello'}, {
        name: 'Sara'
      }),
      userName,
      ip: ctx.ip
    }
  }


  async appWillClose() {
    Logger.getLogger('controller').info('controller appWillClose ');
  }
}
