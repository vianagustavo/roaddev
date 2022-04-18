import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Classes } from "./Classes";
import { School } from "./School";

@Entity("teachers")
class Teacher {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => School, (School) => School.teachers)
  @JoinTable()
  schools: School[];

  @ManyToMany(() => Classes, (Classes) => Classes.teachers)
  classes: Classes[];

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Teacher };
