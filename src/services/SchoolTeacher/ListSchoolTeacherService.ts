import { InvalidArgument } from "../../app";
import { ISchoolTeacherFilter } from "../../domain/requestDto";
import { School } from "../../entities/School";
import { Teacher } from "../../entities/Teacher";
import { SchoolRepository } from "../../repositories/SchoolRepositories";
import { TeacherRepository } from "../../repositories/TeacherRepositories";

class ListSchoolTeacherService {
  async execute(filters: ISchoolTeacherFilter) {
    const hasSchoolFilter =
      filters.schoolId !== undefined && filters.teacherId === undefined;
    const hasTeacherFilter =
      filters.teacherId !== undefined && filters.schoolId === undefined;

    if (filters.schoolId === undefined && filters.teacherId === undefined) {
      throw new InvalidArgument("Invalid Filters for School-Teacher");
    }

    if (hasSchoolFilter) {
      const school = await SchoolRepository.findOne({
        where: { id: filters.schoolId }
      });
      if (!school) {
        throw new InvalidArgument("Invalid school");
      }
      return (school.teachers = await SchoolRepository.createQueryBuilder()
        .relation(School, "teachers")
        .of(school)
        .loadMany());
    }

    if (hasTeacherFilter) {
      const teacher = await TeacherRepository.findOne({
        where: { id: filters.teacherId }
      });
      if (!teacher) {
        throw new InvalidArgument("Invalid teacher");
      }

      return (teacher.schools = await TeacherRepository.createQueryBuilder()
        .relation(Teacher, "schools")
        .of(teacher)
        .loadMany());
    }
  }
}

export { ListSchoolTeacherService };
