import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "@augejs/typeorm";

@Entity('pp_role')
@Tree("closure-table")
export class Role {
  @PrimaryColumn({
    type: 'bigint',
    comment: 'pk SnowflakeNo format',
  })
  roleNo!: bigint;

  @TreeParent()
  parent!: Role;

  @TreeChildren()
  children!: Role[];

  @Column({
    type: 'bigint',
    comment: 'orgNo for user'
  })
  orgNo!: bigint;

  @Column({
    type: 'bigint',
    comment: 'appNo for user'
  })
  appNo!: bigint;

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
    length: 120,
    nullable: true,
  })
  creatorName!: string;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
