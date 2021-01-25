import { Provider } from '@augejs/core';
import { IAccessTokenManager, AccessTokenMiddleware } from '@augejs/poppy-token';
import { Prefix, RequestMapping, RequestParams , IKoaContext} from '@augejs/koa';
import { AccessData } from '@augejs/poppy-token/dist/utils';

@Provider()
@Prefix('user')
export class UserController {

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

    // tickOff all other userId by count
    const preAccessDataList: AccessData[] = await ctx.accessTokenManager.findAccessDataListByUserId(userId, 3);
    for (const preAccessData of preAccessDataList) {
      preAccessData.isDead = true;
      preAccessData.message = 'you are be kicked of';
      preAccessData.flush();
      await preAccessData.save();
    }

    const accessData: AccessData = await ctx.accessTokenManager.createAccessData({
      userId
    });

    await accessData.save();

    ctx.set('set-access-token', accessData.token);

    return accessData.toJSON();
  }

  /**
   * @api {post} /user/img Request User information
   * @apiGroup User
   *
   * 
   * @apiSampleRequest /user/img
   * 
   */
  async img(@RequestParams.Context() ctx: IKoaContext) {
    await ctx.sendFile('assets/header.gif');
  }
}
