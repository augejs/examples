/**
 * Usage:
 * 
 * npm install @augejs/core @augejs/file-config reflect-metadata -S
 * 
 */

import path from 'path';
import { Module, boot, Config, Value } from '@augejs/core';
import { PropertiesConfig, YAMLConfig } from '@augejs/file-config';

@PropertiesConfig(path.join(process.cwd(), 'config/app.properties'), 
{
  processor(result: any):any {
    // we can do some password transform here
    return result;
  }
})
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

  async onInit() {
    // output custom config is { name: 'xxx', age: 111 }
    console.log('custom config is', this.config.custom);
    // output custom config is { name: 'xxx', age: 111 }
    console.log('custom config is', this.customConfig);
    // output: custom config name is xxx
    console.log('custom config name is', this.customConfigName);
  }
}

(async () => {
  await boot(AppModule);
})();
