import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Operator {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  operatorNo!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;
}
