import { GetLogger, ILogger, Provider } from "@augejs/core";
import { HostMiddleware, IKoaContext } from "@augejs/koa";

@HostMiddleware()
@Provider()
export class LogMiddleware {

  @GetLogger()
  logger!:ILogger;

  async use(ctx: IKoaContext, next: CallableFunction): Promise<void> {
    this.logger.info(`API Pre Request: ${ctx.url}`);
    await next();
    this.logger.info(`API After Request: ${ctx.url}`);
  }
}
