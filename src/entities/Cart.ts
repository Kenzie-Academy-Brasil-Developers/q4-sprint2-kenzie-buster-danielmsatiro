import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Dvd } from "./Dvd";
import { User } from "./User";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ default: false })
  paid?: boolean;

  @Column({ type: "float" })
  total: number;

  @ManyToOne(() => User, (user) => user, { eager: true })
  user: User;

  @ManyToOne(() => Dvd, (dvd) => dvd, { eager: true })
  dvd: Dvd;
}
