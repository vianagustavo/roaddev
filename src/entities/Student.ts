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
import { School } from "./School";

@Entity("students")
class Student {
  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: "schoolId" })
  @ManyToOne(() => School)
  school: School;

  @Column()
  schoolId: string;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column()
  enrollment: number;

  @Column({ select: false })
  password: string;

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

export { Student };
