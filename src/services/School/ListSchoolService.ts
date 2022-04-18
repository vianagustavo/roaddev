import { ISchoolDbFilter } from "../../domain/requestDto";
import { SchoolRepository } from "../../repositories/SchoolRepositories";

class ListSchoolService {
  async execute(filters: ISchoolDbFilter) {
    const hasFilter = filters.networkId !== undefined;

    if (hasFilter) {
      const schoolsFiltered = await SchoolRepository.find({ where: filters });
      return schoolsFiltered;
    }
    const schools = await SchoolRepository.find();
    return schools;
  }
}

export { ListSchoolService };
