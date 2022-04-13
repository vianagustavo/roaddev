import { InvalidArgument } from "../../app";
import { NetworkRepository } from "../../repositories/NetworkRepositories";
import { SchoolRepository } from "../../repositories/SchoolRepositories";

interface ISchoolRequest {
  id: string;
  name: string;
  address: string;
}

class CreateSchoolService {
  async execute({ id, name, address }: ISchoolRequest) {
    if (!name) {
      throw new Error("Incorrect School name");
    }
    if (!id) {
      throw new Error("Incorrect Network");
    }

    const schoolAlreadyExists = await SchoolRepository.findOne({
      where: { name }
    });

    if (schoolAlreadyExists) {
      throw new Error("School already exists!");
    }
    const networkExists = await NetworkRepository.findOne({
      where: { id }
    });

    if (!networkExists) {
      throw new InvalidArgument("Incorrect Network");
    }

    const school = SchoolRepository.create({
      networkId: id,
      name,
      address
    });

    await SchoolRepository.save(school);

    return school;
  }
}

export { CreateSchoolService };
