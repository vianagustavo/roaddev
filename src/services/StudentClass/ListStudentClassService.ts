import { InvalidArgument } from "../../app";
import { IStudentClassFilter } from "../../domain/requestDto";
import { Classes } from "../../entities/Classes";
import { Student } from "../../entities/Student";
import { ClassesRepository } from "../../repositories/ClassesRepositories";
import { StudentRepository } from "../../repositories/StudentRepositories";

class ListStudentClassService {
  async execute(filters: IStudentClassFilter) {
    const hasClassFilter =
      filters.classId !== undefined && filters.studentId === undefined;
    const hasStudentFilter =
      filters.studentId !== undefined && filters.classId === undefined;

    if (filters.classId === undefined && filters.studentId === undefined) {
      throw new InvalidArgument("Invalid Filters for Student-Class");
    }

    if (hasClassFilter) {
      const classes = await ClassesRepository.findOne({
        where: { id: filters.classId }
      });
      if (!classes) {
        throw new InvalidArgument("Invalid class");
      }
      return (classes.students = await ClassesRepository.createQueryBuilder()
        .relation(Classes, "students")
        .of(classes)
        .loadMany());
    }

    if (hasStudentFilter) {
      const student = await StudentRepository.findOne({
        where: { id: filters.studentId }
      });
      if (!student) {
        throw new InvalidArgument("Invalid student");
      }

      return (student.classes = await StudentRepository.createQueryBuilder()
        .relation(Student, "classes")
        .of(student)
        .loadMany());
    }
  }
}

export { ListStudentClassService };
