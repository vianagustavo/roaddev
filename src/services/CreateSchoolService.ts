import { SchoolRepository } from "../repositories/SchoolRepositories";

interface ISchoolRequest {
  networkId: string;
  name: string;
  address: string;
}

class CreateSchoolService {
  async execute({ networkId, name, address }: ISchoolRequest) {
    if (!name) {
      throw new Error("Incorrect School name");
    }
    const schoolAlreadyExists = await SchoolRepository.findOne({
      where: { name }
    });

    if (schoolAlreadyExists) {
      throw new Error("School already exists!");
    }

    if (!networkId) {
      throw new Error("Incorrect Network");
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
