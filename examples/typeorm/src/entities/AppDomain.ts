import { Column, CreateDateColumn, Index, PrimaryColumn, UpdateDateColumn } from "@augejs/typeorm";

export enum AppDomainStatus {
  DISABLED = "disabled",
  NORMAL = "normal"
}

export class AppDomain {
  @PrimaryColumn({
    length: 80,
  })
  domain!: string;

  @Column({
    length: 80,
    comment: 'display nick name'
  })
  nickName!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  desc!: string;

  @Column({
    type: "enum",
    enum: AppDomainStatus,
    default: AppDomainStatus.NORMAL,
  })
  @Index()
  status!: AppDomainStatus;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
