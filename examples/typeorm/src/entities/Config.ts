import { Column, Entity, Index, PrimaryColumn } from "@augejs/typeorm";

@Entity('pp_config')
export class Config {
  @Column({
    type: 'bigint',
    comment: 'appNo SnowflakeNo format'
  })
  @Index()
  appNo!: bigint;

  @PrimaryColumn({
    length: 30,
  })
  category!: string;

  @PrimaryColumn({
    length: 80,
  })
  key!: string;
}
