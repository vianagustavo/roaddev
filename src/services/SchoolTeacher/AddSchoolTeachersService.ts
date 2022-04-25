import { InvalidArgument } from "../../app";
import { Teacher } from "../../entities/Teacher";
import { SchoolRepository } from "../../repositories/SchoolRepositories";
import { TeacherRepository } from "../../repositories/TeacherRepositories";

interface ISchoolTeacherRequest {
  schoolId: string;
  teacherId: string;
}

class AddSchoolTeacherService {
  async execute({ schoolId, teacherId }: ISchoolTeacherRequest) {
    if (!schoolId || !teacherId) {
      throw new InvalidArgument("Incorrect inputs");
    }
    const schoolExists = await SchoolRepository.findOne({
      where: { id: schoolId }
    });
    if (!schoolExists) {
      throw new InvalidArgument("Incorrect School");
    }
    const teacherExists = await TeacherRepository.findOne({
      where: { id: teacherId }
    });
    if (!teacherExists) {
      throw new InvalidArgument("Incorrect Teacher");
    }
    try {
      await TeacherRepository.createQueryBuilder()
        .relation(Teacher, "schools")
        .of(teacherExists)
        .add(schoolExists);
    } catch (err) {
      throw new InvalidArgument("School already listed for this teacher");
    }
    return teacherExists;
  }
}

export { AddSchoolTeacherService };
