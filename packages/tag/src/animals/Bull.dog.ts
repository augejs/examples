import { Tag, Provider } from '@augejs/core';
import { IDog, IAnimal } from '../interfaces';

@Tag('Animal')
@Tag('Dog')
@Provider()
export class BullDog implements IDog, IAnimal {

  async say(): Promise<string> {
    return `hi~, I'm a bull dog .`;
  }

  async bark(): Promise<string> {
    return `The bull dog is barking`;
  }
}
