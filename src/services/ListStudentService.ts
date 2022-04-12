import { IStudentDbFilter } from "../domain/requestDto";
import { StudentRepository } from "../repositories/StudentRepositories";

async function getNetworkFilter(filters: IStudentDbFilter) {
  return await StudentRepository.createQueryBuilder("student")
    .innerJoinAndSelect("student.school", "school")
    .innerJoinAndSelect("school.network", "network")
    .where("network.id = :networkId", { networkId: filters.networkId })
    .getMany();
}

async function getSchoolFilter(filters: IStudentDbFilter) {
  return await StudentRepository.createQueryBuilder("student")
    .innerJoinAndSelect("student.school", "school")
    .where("school.id = :schoolId", { schoolId: filters.schoolId })
    .getMany();
}

async function getBothFilters(filters: IStudentDbFilter) {
  return await StudentRepository.createQueryBuilder("student")
    .innerJoinAndSelect("student.school", "school")
    .innerJoinAndSelect("school.network", "network")
    .where("network.id = :networkId", { networkId: filters.networkId })
    .andWhere("school.id = :schoolId", { schoolId: filters.schoolId })
    .getMany();
}

class ListStudentService {
  async execute(filters: IStudentDbFilter) {
    const hasNetworkFilter =
      filters.networkId !== undefined && filters.schoolId === undefined;
    const hasSchoolFilter =
      filters.schoolId !== undefined && filters.networkId === undefined;
    const hasBothFilters =
      (filters.networkId && filters.schoolId) !== undefined;

    if (hasSchoolFilter) {
      const students = await getSchoolFilter(filters);
      return students;
    } else if (hasNetworkFilter) {
      const students = await getNetworkFilter(filters);
      return students;
    } else if (hasBothFilters) {
      const students = await getBothFilters(filters);
      return students;
    } else {
      const students = await StudentRepository.find();
      return students;
    }
  }
}

export { ListStudentService };
