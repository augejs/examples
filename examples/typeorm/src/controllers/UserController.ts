import { GetLogger, ILogger, Inject, Logger, Provider } from "@augejs/core";
import { IKoaContext, Prefix, RequestMapping, RequestParams } from "@augejs/koa";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

@Provider()
@Prefix('user')
export class UserController {

  @Inject(UserRepository)
  userRepository!:UserRepository;

  @GetLogger()
  logger!: ILogger;
  
  /**
   * @api {get} /user/findAllUsers findAllUsers
   *
   * @apiGroup User
   *
   * @apiSampleRequest /user/findAllUsers
   */
  @RequestMapping.Get()
  async findAllUsers(@RequestParams.Context() ctx: IKoaContext): Promise<User[]> {
    this.logger.info(ctx.header);
    return await this.userRepository.findAllUsers();
  }

  /**
   * @api {post} /user/createNewUser createNewUser
   *
   * @apiGroup User
   *
   * @apiSampleRequest /user/createNewUser
   */
   @RequestMapping.Post()
  async createNewUser(): Promise<User> {
    return await this.userRepository.createNewUser()
  }
}
