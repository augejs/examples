import { Module } from "@augejs/core";
import { HelloController } from "./controllers/HelloController";
import { LogMiddleware } from "./middlewares/LogMiddleware";


@Module({
  providers: [
    HelloController,
    LogMiddleware,
  ]
})
export class ModuleA {
}
