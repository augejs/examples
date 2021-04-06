import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "@augejs/typeorm";

export enum I18nStatus {
  DISABLED = "disabled",
  NORMAL = "normal"
}

@Entity('pp_i18n')
// @Index("idx_local_category_key", ['locale', 'category', 'key'], { unique: true })
export class I18n {
  @PrimaryColumn({
    length: 80,
  })
  locale!: string;

  @PrimaryColumn({
    length: 30,
  })
  category!: string;

  @PrimaryColumn({
    length: 80,
  })
  key!: string;

  @Column({
    length: 500,
  })
  value!: string;

  @Column({
    type: 'text'
  })
  desc!: string;

  @Column({
    type: "enum",
    enum: I18nStatus,
    default: I18nStatus.NORMAL,
  })
  @Index()
  status!: I18nStatus;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
