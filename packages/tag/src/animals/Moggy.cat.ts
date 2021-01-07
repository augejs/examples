import { Tag, Provider } from '@augejs/module-core';
import { ICat, IAnimal } from '../interfaces';

@Tag('Animal')
@Tag('Cat')
@Provider()
export class MoggyCat implements ICat, IAnimal {

  async say(): Promise<string> {
    return `Hi~, I'm a moggy cat.`;
  }

  async catch(): Promise<string> {
    return `The moggy cat is catching a mouse.`;
  }
}
