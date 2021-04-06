import { Column, CreateDateColumn, Index, PrimaryColumn, UpdateDateColumn } from "@augejs/typeorm";

export enum AppStatus {
  DISABLED = "disabled",
  NORMAL = "normal",
}

export class App {
  @PrimaryColumn({
    type: 'bigint',
    comment: 'pk SnowflakeNo format',
  })
  appNo!: bigint;

  @Column({
    type: 'bigint',
    comment: 'orgNo for user'
  })
  @Index()
  orgNo!: bigint;

  @Column({
    length: 200,
    comment: 'app icon image (abs)path',
    nullable: true,
  })
  icon!: string;

  @Column({
    length: 80,
    comment: 'user display nick name'
  })
  displayName!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  desc!: string;

  @Column({
    type: "enum",
    enum: AppStatus,
    default: AppStatus.NORMAL,
  })
  @Index()
  status!: AppStatus;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
