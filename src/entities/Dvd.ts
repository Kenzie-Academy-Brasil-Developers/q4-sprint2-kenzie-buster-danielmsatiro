import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Cart } from "./Cart";
import { Stock } from "./Stock";

@Entity("dvd")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  duration: string;

  @OneToMany(() => Cart, (cart) => cart.dvd)
  cart?: Cart[];

  @OneToOne(() => Stock, (stock) => stock, { eager: true })
  @JoinColumn()
  stock: Stock;
}
