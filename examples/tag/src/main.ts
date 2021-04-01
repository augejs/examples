import { Module, ILogger, boot, GetLogger, GetContainer, Container,  } from '@augejs/core';

import {
  AkitaDog,
  BullDog,
  KittyCat,
  MoggyCat
} from './animals';

import { IAnimal, IDog, ICat } from './interfaces';

@Module({
  providers: [
    AkitaDog,
    BullDog,
    KittyCat,
    MoggyCat
  ]
})
class AppModule {

  @GetLogger()
  logger!: ILogger;

  @GetContainer()
  container!: Container;

  async onInit() {
    this.logger.info('app onInit');
  }

  async onAppDidReady () {
    this.logger.info('app onAppDidReady');

    const animals = this.container.getAll<IAnimal>('Animal');
    this.logger.info(`animals count ${animals.length}`);
    for (const animal of animals) {
      const result = await animal.say();
      this.logger.info(`animal say:  ${result}`);
    }

    const dogs = this.container.getAll<IDog>('Dog');
    this.logger.info(`dogs count ${dogs.length}`);
    for (const dog of dogs) {
      const result = await dog.bark();
      this.logger.info(`dog bark:  ${result}`);
    }

    const cats = this.container.getAll<ICat>('Cat');
    this.logger.info(`cats count ${cats.length}`);
    for (const cat of cats) {
      const result = await cat.catch();
      this.logger.info(`dog bark:  ${result}`);
    }
  }
}

async function main() {
  await boot(AppModule);
}

main();

