import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ unique: true, type: "numeric" })
  price: number;
}
