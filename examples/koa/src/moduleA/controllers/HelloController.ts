import { Provider } from "@augejs/core";
import { Middleware, Prefix, RequestMapping } from "@augejs/koa";

@Provider()
@Prefix('hello')
export class HelloController {

  @RequestMapping.Get()
  async sayName(): Promise<string> {
    return "hello, i'm Eric ~"
  }

  @Middleware(async (_, next: CallableFunction) => {
    console.log("pre sayAge");
    await next();
    console.log("after sayAge");
  })
  @RequestMapping.Get()
  async sayAge(): Promise<string> {
    return "hello, i'm Eric ~"
  }
}
