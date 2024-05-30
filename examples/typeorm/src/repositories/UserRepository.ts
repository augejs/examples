import { Inject, Provider } from "@augejs/core";
import crypto from 'crypto';
import { getRepository, Repository } from "@augejs/typeorm";
import { SnowflakeService } from "../services/SnowflakeService";
import { User } from '../entities/User';
import { Role } from "../entities/Role";

@Provider()
export class UserRepository {

  @Inject(SnowflakeService)
  snowflakeService!: SnowflakeService;

  userRepository: Repository<User> = getRepository(User);

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createNewUser(): Promise<User> {
    
    const user: User = new User();
    user.userNo = await this.snowflakeService.getUniqueId();
    user.random = crypto.randomBytes(16).toString();
    user.orgNo = await this.snowflakeService.getUniqueId();
    user.appNo =await this.snowflakeService.getUniqueId();
    user.accountName = crypto.randomBytes(10).toString();
    user.mobileNo = crypto.randomBytes(10).toString();
    user.emailAddr = crypto.randomBytes(10).toString();
    user.passwd = crypto.randomBytes(10).toString();
    user.optKey = crypto.randomBytes(10).toString();
    user.displayName = crypto.randomBytes(10).toString();

    await this.userRepository.save(user);

    return user;
  }
}
