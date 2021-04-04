import { ILogger, Inject, GetLogger, Provider } from "@augejs/core";
import { RenderFunction, VIEWS_IDENTIFIER } from "@augejs/views";
import { RequestMapping, Prefix, RequestParams, IKoaContext } from '@augejs/koa';

@Prefix('view')
@Provider()
export class ViewController {
  @Inject(VIEWS_IDENTIFIER)
  render!: RenderFunction;

  @GetLogger()
  logger!: ILogger;

  @RequestMapping.Get()
  async basic(@RequestParams.Context() context: IKoaContext):Promise<string> {
    const htmlStr = await this.render('basic.html');
    context.type = 'html';
    return htmlStr;
  }
}
