import { GetLogger, ILogger, Inject, Provider } from "@augejs/core";
import { REDIS_IDENTIFIER, Commands, SubscribeMessage } from '@augejs/redis';
import { Prefix, RequestMapping, RequestParams } from '@augejs/koa';
import { KoaBodyParserMiddleware } from '@augejs/koa-bodyparser';

@Provider()
@KoaBodyParserMiddleware()
@Prefix('redis')
export class RedisController {

  @GetLogger()
  logger!: ILogger;

  @Inject(REDIS_IDENTIFIER)
  redis!: Commands;


  /**
   * @api {post} /redis/setKey SetKey
   *
   * @apiGroup Redis
   *
   * @apiSampleRequest /redis/setKey
   */

   @RequestMapping.Post()
   async setKey(): Promise<string> {
     this.logger.info('set the basic key EX start');
     const result000 = await this.redis.set('say', 'hello');
     this.logger.info(`set the basic key EX end ${result000}`);
 
     this.logger.info('set the basic key EX start');
     const result001 = await this.redis.set('hello', 'hello', 'EX', 100);
     this.logger.info(`set the basic key EX end ${result001}`);
 
     this.logger.info('set the basic key PX start');
     const result002 = await this.redis.set('hi', 'hello', 'PX', 100000);
     this.logger.info(`set the basic key EX end ${result002}`);
 
     return "Success";
   }

   /**
   * @api {post} /redis/increase Increase
   *
   * @apiGroup Redis
   *
   * @apiSampleRequest /redis/increase
   */

    @RequestMapping.Post()
    async increase(): Promise<number> {
      return await this.redis.incrby("customerNoPre", 2);
    }

    @SubscribeMessage('my-channel')
    async onMessage(channel: string, message: string): Promise<void> {
      this.logger.info(`on message channel: ${channel} message: ${message}`);
    }

    /**
   * @api {post} /redis/lock Publish Redis Message
   *
   * @apiGroup Redis
   *
   * @apiParam {String} message="default" Message
   *
   * @apiSampleRequest /redis/lock
   */
  //  @RedisLock()
   @RequestMapping.Post()
   async lock(
    @RequestParams.Body('message') message: string
   ): Promise<string> {
      this.logger.info('redis publish message: ' + message)
      this.redis.publish('my-channel', message);

      return 'redis publish message: ' + message;
   }
}
