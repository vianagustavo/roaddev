import { InvalidArgument } from "../../app";
import { Classes } from "../../entities/Classes";
import { Student } from "../../entities/Student";
import { ClassesRepository } from "../../repositories/ClassesRepositories";
import { StudentRepository } from "../../repositories/StudentRepositories";
import { validateClass } from "../TeacherClass/AddTeacherClass";

interface IStudentClassRequest {
  studentId: string;
  classId: string;
}

class AddStudentClassService {
  async execute({ studentId, classId }: IStudentClassRequest) {
    if (!studentId || !classId) {
      throw new InvalidArgument("Incorrect inputs");
    }
    const classExists = await ClassesRepository.findOne({
      where: { id: classId }
    });

    const studentExists = await StudentRepository.findOne({
      where: { id: studentId }
    });
    if (!classExists || !studentExists) {
      throw new InvalidArgument("Invalid student and/or class");
    }
    studentExists.classes = await StudentRepository.createQueryBuilder()
      .relation(Student, "classes")
      .of(studentExists)
      .loadMany();

    validateClass(studentExists.classes, classExists);

    try {
      await ClassesRepository.createQueryBuilder()
        .relation(Classes, "students")
        .of(classExists)
        .add(studentExists);
    } catch (err) {
      throw new InvalidArgument("Student already listed on this class");
    }

    return classExists;
  }
}

export { AddStudentClassService };
