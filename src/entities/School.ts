import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Network } from "./Network";

@Entity("schools")
class School {
  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: "networkId" })
  @ManyToOne(() => Network)
  network: Network;

  @Column()
  networkId: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { School };
