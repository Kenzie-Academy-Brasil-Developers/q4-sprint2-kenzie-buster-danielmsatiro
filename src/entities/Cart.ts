import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Dvd } from "./Dvd";
import { User } from "./User";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ type: "float" })
  total: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @OneToOne(() => Dvd, (dvd) => dvd, { nullable: true })
  @JoinColumn()
  dvd: Dvd;
}
