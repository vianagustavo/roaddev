import { InvalidArgument } from "../../app";
import { IClassRequest } from "../../domain/requestDto";
import { ClassesRepository } from "../../repositories/ClassesRepositories";
import { SchoolRepository } from "../../repositories/SchoolRepositories";

class CreateClassesService {
  async execute({
    name,
    schoolId,
    classDay,
    classStart,
    classEnd
  }: IClassRequest) {
    if (!name || !schoolId || !classDay || !classStart || !classEnd) {
      throw new InvalidArgument("Invalid inputs");
    }

    if (classDay > 6) {
      throw new InvalidArgument("Invalid Class Day");
    }

    const schoolExists = await SchoolRepository.findOne({
      where: { id: schoolId }
    });

    if (!schoolExists) {
      throw new InvalidArgument("Incorrect School");
    }

    const classAlreadyExists = await ClassesRepository.findOne({
      where: { name, classDay, classStart, classEnd }
    });
    if (classAlreadyExists) {
      throw new InvalidArgument("Class already exists");
    }

    const classes = ClassesRepository.create({
      name,
      schoolId,
      classDay,
      classStart,
      classEnd
    });

    await ClassesRepository.save(classes);
    return classes;
  }
}

export { CreateClassesService };
