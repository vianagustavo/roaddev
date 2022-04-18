import { InvalidArgument } from "../../app";
import { ClassesRepository } from "../../repositories/ClassesRepositories";
import { SchoolRepository } from "../../repositories/SchoolRepositories";

class CreateClassesService {
  async execute(name: string, schoolId: string) {
    if (!name || !schoolId) {
      throw new InvalidArgument("Invalid inputs");
    }

    const schoolExists = await SchoolRepository.findOne({
      where: { id: schoolId }
    });

    if (!schoolExists) {
      throw new InvalidArgument("Incorrect School");
    }

    const classAlreadyExists = await ClassesRepository.findOne({
      where: { name }
    });
    if (classAlreadyExists) {
      throw new InvalidArgument("Class already exists");
    }

    const classes = ClassesRepository.create({
      name,
      schoolId
    });

    await ClassesRepository.save(classes);
    return classes;
  }
}

export { CreateClassesService };
