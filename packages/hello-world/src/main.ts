
/**
 * Usage:
 * 
 * npm install @augejs/module-core reflect-metadata -S
 * 
 */

import { Module, boot } from '@augejs/module-core';

// we use a @Module decorator to define a module
@Module()
class AppModule {
  async onInit() {
    // the onInit lifecycle method will be called when application boot
    console.log('hello augejs');
  }
}

(async () => {
  // boot the whole application by module.
  await boot(AppModule);
})();
