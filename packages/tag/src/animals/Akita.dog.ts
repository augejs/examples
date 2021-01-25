import { Tag, Provider } from '@augejs/core';

import { IDog, IAnimal } from '../interfaces';

@Tag('Animal')
@Tag('Dog')
@Provider()
export class AkitaDog implements IDog, IAnimal {

  async say(): Promise<string> {
    return `hi~, I'm a akita dog .`;
  }

  async bark(): Promise<string> {
    return `The akita dog is barking`;
  }
}
