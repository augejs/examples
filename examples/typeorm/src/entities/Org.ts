import { Column, Entity, Index, PrimaryColumn } from "@augejs/typeorm";

export enum OrgStatus {
  DISABLED = "disabled",
  NORMAL = "normal"
}

@Entity('pp_org')
export class Org {
  @PrimaryColumn({
    type: 'bigint',
    comment: 'pk SnowflakeNo format',
  })
  orgNo!: bigint;

  @Column({
    type: "enum",
    enum: OrgStatus,
    default: OrgStatus.NORMAL,
  })
  @Index()
  status!: OrgStatus;
}
