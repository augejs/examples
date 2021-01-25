import { Tag, Provider } from '@augejs/core';
import { ICat, IAnimal } from '../interfaces';

@Tag('Animal')
@Tag('Cat')
@Provider()
export class KittyCat implements ICat, IAnimal {

  async say(): Promise<string> {
    return `hi~, I'm a kitty cat.`;
  }

  async catch(): Promise<string> {
    return `The kitty cat is catching a mouse.`;
  }
}
