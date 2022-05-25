import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ type: "float" })
  total: number;
}
