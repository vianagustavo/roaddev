import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { School } from "./School";
import { v4 as uuid } from "uuid";
import { Student } from "./Student";

@Entity("classes")
class Classes {
  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: "schoolId" })
  @ManyToOne(() => School)
  school: School;

  @ManyToMany(() => Student, (Student) => Student.classes)
  @JoinTable()
  students: Student[];

  @Column()
  schoolId: string;

  @Column()
  name: string;

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

export { Classes };
