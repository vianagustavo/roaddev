import { IStudentDbFilter } from "../domain/requestDto";
import { StudentRepository } from "../repositories/StudentRepositories";

class ListStudentService {
  async execute(filters: IStudentDbFilter) {
    const hasFilter = JSON.stringify(filters.schoolId) !== "{}";

    if (hasFilter) {
      console.log(filters);
      const studentsFiltered = await StudentRepository.find({
        where: filters
      });
      return studentsFiltered;
    }

    const students = await StudentRepository.find();
    return students;
  }
}

export { ListStudentService };
