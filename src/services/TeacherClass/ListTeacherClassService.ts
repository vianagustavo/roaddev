import { InvalidArgument } from "../../app";
import { ITeacherClassFilter } from "../../domain/requestDto";
import { Classes } from "../../entities/Classes";
import { Teacher } from "../../entities/Teacher";
import { ClassesRepository } from "../../repositories/ClassesRepositories";
import { TeacherRepository } from "../../repositories/TeacherRepositories";

class ListTeacherClassService {
  async execute(filters: ITeacherClassFilter) {
    const hasClassFilter =
      filters.classId !== undefined && filters.teacherId === undefined;
    const hasTeacherFilter =
      filters.teacherId !== undefined && filters.classId === undefined;

    if (filters.classId === undefined && filters.teacherId === undefined) {
      throw new InvalidArgument("Invalid Filters for Teacher-Class");
    }

    if (hasClassFilter) {
      const classes = await ClassesRepository.findOne({
        where: { id: filters.classId }
      });
      if (!classes) {
        throw new InvalidArgument("Invalid class");
      }
      return (classes.teachers = await ClassesRepository.createQueryBuilder()
        .relation(Classes, "teachers")
        .of(classes)
        .loadMany());
    }

    if (hasTeacherFilter) {
      const teacher = await TeacherRepository.findOne({
        where: { id: filters.teacherId }
      });
      if (!teacher) {
        throw new InvalidArgument("Invalid student");
      }

      return (teacher.classes = await TeacherRepository.createQueryBuilder()
        .relation(Teacher, "classes")
        .of(teacher)
        .loadMany());
    }
  }
}

export { ListTeacherClassService };
