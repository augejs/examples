import { Column, CreateDateColumn, Entity, PrimaryColumn, TreeChildren, TreeParent, UpdateDateColumn } from "@augejs/typeorm";

export enum ResourceStatus {
  DISABLED = "disabled",
  NORMAL = "normal",
}

export enum ResourceType {
  PAGE = 'page',
  FUNCTION = 'func',
}

@Entity('pp_resource')
export class Resource {
  @PrimaryColumn({
    type: 'bigint',
    comment: 'resource code',
  })
  resourceCode!: string;

  @Column()
  resourceType!: ResourceType;

  @TreeParent()
  parent!: Resource;

  @TreeChildren()
  children!: Resource[];

  @Column({
    length: 200,
    comment: 'icon (abs)path',
    nullable: true,
  })
  icon!: string;

  @Column({
    type: 'int',
    comment: 'sort priority',
  })
  priority!: number;

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
