import { InvalidArgument } from "../../app";
import { ISchoolRequest } from "../../domain/requestDto";
import { NetworkRepository } from "../../repositories/NetworkRepositories";
import { SchoolRepository } from "../../repositories/SchoolRepositories";

class CreateSchoolService {
  async execute({ networkId, name, address }: ISchoolRequest) {
    if (!name) {
      throw new Error("Incorrect School name");
    }
    if (!networkId) {
      throw new Error("Incorrect Network");
    }

    const schoolAlreadyExists = await SchoolRepository.findOne({
      where: { name }
    });

    if (schoolAlreadyExists) {
      throw new Error("School already exists!");
    }
    const networkExists = await NetworkRepository.findOne({
      where: { id: networkId }
    });

    if (!networkExists) {
      throw new InvalidArgument("Incorrect Network");
    }

    const school = SchoolRepository.create({
      networkId,
      name,
      address
    });

    await SchoolRepository.save(school);

    return school;
  }
}

export { CreateSchoolService };
