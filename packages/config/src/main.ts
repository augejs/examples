/**
 * Usage:
 * 
 * npm install @augejs/module-core reflect-metadata -S
 * 
 */

import { Module, boot, Config, Value } from '@augejs/module-core';

@Config({
  custom: {
    name: 'xxx',
    age: 111,
    detailInfo: {
      address: 'address xxxxxx'
    },
    friends: [
      {
        name: 'friends-001'
      }
    ]
  }
})
@Module()
class AppModule {

  // the value PropertyDecorator can get the global config value
  @Value()
  config!: any;

  // the value PropertyDecorator also support parameter
  @Value('custom')
  customConfig!: Record<string, any>;

  @Value('custom.name')
  customConfigName!: string;

  @Value('custom.detailInfo.address')
  customConfigAddress!: string;

  @Value('custom.friends.0.name')
  customConfigFirstFriendName!: string;

  async onInit() {
    // output custom config is { name: 'xxx', age: 111 }
    console.log('custom config is', this.config.custom);
    // output custom config is { name: 'xxx', age: 111 }
    console.log('custom config is', this.customConfig);
    // output: custom config name is xxx
    console.log('custom config name is', this.customConfigName);
    //output: custom config address is address xxxxxx
    console.log('custom config address is', this.customConfigAddress);
    // output: custom config first friend name is friends-001
    console.log('custom config first friend name is', this.customConfigFirstFriendName);
  }
}

(async () => {
  await boot(AppModule);
})();
