import { InvalidArgument } from "../../app";
import { TeacherRepository } from "../../repositories/TeacherRepositories";

class CreateTeacherService {
  async execute(name: string) {
    if (!name) {
      throw new InvalidArgument("Incorrect name");
    }

    const teacherAlreadyExists = await TeacherRepository.findOne({
      where: { name }
    });
    if (teacherAlreadyExists) {
      throw new InvalidArgument("Teacher already signed up");
    }

    const teacher = TeacherRepository.create({
      name
    });

    await TeacherRepository.save(teacher);

    return teacher;
  }
}

export { CreateTeacherService };
