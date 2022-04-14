import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Network } from "./Network";
import { Teacher } from "./Teacher";

@Entity("schools")
class School {
  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: "networkId" })
  @ManyToOne(() => Network)
  network: Network;

  @Column()
  networkId: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.schools)
  teachers: Teacher[];

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
