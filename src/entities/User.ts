import { compare } from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cart } from "./Cart";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdm?: boolean;

  @OneToMany(() => Cart, (carts) => carts.user)
  carts: Cart[];

  comparePwd = async (recievedPwd: string): Promise<boolean> => {
    return await compare(recievedPwd, this.password);
  };
}
