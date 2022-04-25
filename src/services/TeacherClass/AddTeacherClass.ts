import { InvalidArgument } from "../../app";
import { Classes } from "../../entities/Classes";
import { Teacher } from "../../entities/Teacher";
import { ClassesRepository } from "../../repositories/ClassesRepositories";
import { TeacherRepository } from "../../repositories/TeacherRepositories";

interface ITeacherClassRequest {
  teacherId: string;
  classId: string;
}

class AddTeacherClassService {
  async execute({ teacherId, classId }: ITeacherClassRequest) {
    if (!teacherId || !classId) {
      throw new InvalidArgument("Incorrect inputs");
    }
    const classExists = await ClassesRepository.findOne({
      where: { id: classId }
    });
    if (!classExists) {
      throw new InvalidArgument("Invalid class");
    }

    const teacherExists = await TeacherRepository.findOne({
      where: { id: teacherId }
    });
    if (!teacherExists) {
      throw new InvalidArgument("Invalid teacher");
    }

    teacherExists.classes = await TeacherRepository.createQueryBuilder()
      .relation(Teacher, "classes")
      .of(teacherExists)
      .loadMany();

    if (
      teacherExists.classes.find(
        (Classes) => Classes.classDay === classExists.classDay
      ) !== undefined &&
      teacherExists.classes.find(
        (Classes) => Classes.classTime === classExists.classTime
      ) !== undefined
    ) {
      throw new InvalidArgument(
        "Teacher already has a listed class on this day and time"
      );
    }
    try {
      await ClassesRepository.createQueryBuilder()
        .relation(Classes, "teachers")
        .of(classExists)
        .add(teacherExists);
    } catch (err) {
      throw new InvalidArgument("Teacher already listed on this class");
    }

    return classExists;
  }
}

export { AddTeacherClassService };
