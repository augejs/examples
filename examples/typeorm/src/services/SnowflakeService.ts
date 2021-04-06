import { Provider, Value } from "@augejs/core";
import { UniqueID } from 'nodejs-snowflake';

@Provider()
export class SnowflakeService {

  @Value('/snowflake')
  config: any;

  snowflakeInst!:UniqueID;

  onInit(): void {
    this.snowflakeInst = new UniqueID(this.config ?? {});
  }

  async getUniqueId(): Promise<bigint> {
    return await this.snowflakeInst.asyncGetUniqueID() as bigint;
  }
}
