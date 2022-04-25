import { InvalidArgument } from "../../app";
import { Classes } from "../../entities/Classes";
import { Teacher } from "../../entities/Teacher";
import { ClassesRepository } from "../../repositories/ClassesRepositories";
import { TeacherRepository } from "../../repositories/TeacherRepositories";

interface ITeacherClassRequest {
  teacherId: string;
  classId: string;
}

interface IRangeRequest {
  start: string;
  end: string;
  classStart: string;
  classEnd: string;
}

function isInRange({ start, end, classStart, classEnd }: IRangeRequest) {
  const nStart = parseFloat(start);
  const nEnd = parseFloat(end);
  const nClassStart = parseFloat(classStart);
  const nClassEnd = parseFloat(classEnd);
  if (nStart >= nClassStart && nStart <= nClassEnd) {
    return true;
  } else if (nEnd >= nClassStart && nEnd <= nClassEnd) {
    return true;
  }
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

    for (let i = 0; i < teacherExists.classes.length; i++) {
      const start = teacherExists.classes[i].classStart;
      const end = teacherExists.classes[i].classEnd;
      const classStart = classExists.classStart;
      const classEnd = classExists.classEnd;
      if (classExists.classDay === teacherExists.classes[i].classDay) {
        if (isInRange({ classStart, classEnd, start, end })) {
          throw new InvalidArgument(
            "Teacher already has a class on this time and Day"
          );
        }
      }
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
