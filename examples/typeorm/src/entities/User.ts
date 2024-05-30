import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "@augejs/typeorm";

export enum UserStatus {
  DISABLED = "disabled",
  NORMAL = "normal",
  LOCKED = "locked"
}

@Entity('pp_user')
@Index("idx_org_app_account", ['orgNo', 'appNo', 'accountName'], { unique: true })
@Index("idx_org_app_email", ['orgNo', 'appNo', 'emailAddr'], { unique: true })
@Index("idx_org_app_mobile", ['orgNo', 'appNo', 'mobileNo'], { unique: true })
export class User {
  @PrimaryColumn({
    type: 'bigint',
    comment: 'pk SnowflakeNo format',
  })
  userNo!: bigint;

  @Column({
    type: 'bigint',
    comment: 'orgNo SnowflakeNo format'
  })
  @Index()
  orgNo!: bigint;

  @Column({
    type: 'bigint',
    comment: 'appNo SnowflakeNo format'
  })
  @Index()
  appNo!: bigint;

  @Column({
    length: 16,
    comment: '16 chars randomStr for security reason'
  })
  random!: string;

  @Column({
    length: 80,
    comment: 'use accountName'
  })
  @Index()
  accountName!: string;

  @Column({
    length: 20,
    comment: 'use mobile no'
  })
  mobileNo!: string;

  @Column({
    length: 80,
    comment: 'use email'
  })
  emailAddr!: string;

  @Column({
    length: 50,
    select: false,
    comment: 'user passwd sha2(use_no + random_no + raw - pwd)'
  })
  passwd!: string;

  @Column({
    length: '50',
    comment: 'user opt key aes + random_no + row pwd dev for spec'
  })
  optKey!: string;

  @Column({
    length: 80,
    comment: 'user display nick name'
  })
  displayName!: string;

  @Column({
    length: 200,
    comment: 'user header image (abs)path',
    nullable: true,
  })
  headerImg!: string;

  @Column({
    type: 'smallint',
    comment: 'the user login error times',
    default: 0,
  })
  loginErrTimes!: number;

  @Column({
    length: 20,
    default: '127.0.0.1'
  })
  registerIP!: string;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.NORMAL,
  })
  @Index()
  status!: UserStatus;

  @Column({
    length: 120,
    nullable: true,
  })
  creatorName!: string;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
