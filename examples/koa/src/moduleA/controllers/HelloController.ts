import { Provider } from "@augejs/core";
import { Prefix, RequestMapping } from "@augejs/koa";

@Provider()
@Prefix('hello')
export class HelloController {

  @RequestMapping.Get()
  async sayName(): Promise<string> {
    return "hello, i'm Eric ~"
  }
}
