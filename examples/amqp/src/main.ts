import { Module, ILogger, Inject, boot, GetLogger } from '@augejs/core';
import { Amqp, AMQP_IDENTIFIER, AmqpConnectionManager, ChannelWrapper, ConfirmChannel, Message } from '@augejs/amqp';

import {
  WebServer,
  RequestMapping,
  } from '@augejs/koa';

@Amqp({
  urls: [
    'amqp://MjphbXFwLWNuLXp6MTF4NnJtazAwNjpMVEFJNEdHUENrNk5ieUt3c2Rja1FvZGE=:NjAxMzdCMDc1NTk5N0RGQjhEMDg4N0M0Q0E4M0ExM0IyMDY5MTdDQjoxNjA1OTcwMjQxMTM0@amqp-cn-zz11x6rmk006.mq-amqp.cn-hongkong-3568556-b.aliyuncs.com:5672/test'
  ]
})
@WebServer()
@Module()
class AppModule {

  @GetLogger()
  logger!:ILogger;

  @Inject(AMQP_IDENTIFIER)
  amqpConnectionManager!: AmqpConnectionManager;

  amqpChannel!: ChannelWrapper;

  async onInit() {
    this.logger.info('app onInit');

    this.amqpChannel = await this.amqpConnectionManager.createChannel({
      setup: (channel: ConfirmChannel) => {
        return Promise.all([
          // channel.assertQueue("my-queue", { exclusive: false, autoDelete: true }),
          channel.bindQueue("my-queue", "my-exchange", "my-bindkey"),
          channel.prefetch(1),

          channel.consume('my-queue', async (message: Message | null) => {
            const jsonMessage: any = JSON.parse(message!.content.toString());
            console.log('------>>>>', jsonMessage);
            const result = await this.onAMQPMessage(jsonMessage);
            if (typeof result === 'undefined' || result) {
              this.amqpChannel.ack(message as Message);
              // this.amqpChannel.nack(message as Message)
            }
          })
        ]);
      }
    })
  }

  async onAMQPMessage(message) {
  }

  async onAppDidReady () {
    this.logger.info('app onAppDidReady');
    // this.amqpChannel.sendToQueue('my-queue', {hello: '123123'});
  }

  @RequestMapping.Get()
  async send() {
    // await this.amqpChannel.publish('/')
    // sendToQueue will ignore the my-exchange routing just like a direct mode
    await this.amqpChannel.sendToQueue('my-queue', 
    Buffer.from(JSON.stringify({hello: '123123'})));
    return "1";
  }
}

async function main() {
  await boot(AppModule);
}

main();

