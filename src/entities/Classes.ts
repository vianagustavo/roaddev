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
import { Teacher } from "./Teacher";

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

  @ManyToMany(() => Teacher, (Teacher) => Teacher.classes)
  @JoinTable()
  teachers: Teacher[];

  @Column()
  schoolId: string;

  @Column()
  classDay: string;

  @Column()
  classTime: string;

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
