import { Entity, PrimaryGeneratedColumn, Column } from "@augejs/typeorm";

@Entity({
  name: 'boss-user'
})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  operatorNo!: string;

  @Column('text')
  lastName!: string;

  @Column()
  age!: number;
}
