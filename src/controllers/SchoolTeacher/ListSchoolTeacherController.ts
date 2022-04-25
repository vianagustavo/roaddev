import { Request, Response } from "express";
import { ISchoolTeacherFilter } from "../../domain/requestDto";
import { ListSchoolTeacherService } from "../../services/SchoolTeacher/ListSchoolTeacherService";

class ListSchoolTeacherController {
  async handle(request: Request, response: Response) {
    const filters: ISchoolTeacherFilter = request.query;
    const listSchoolTeacherService = new ListSchoolTeacherService();
    const filteredList = await listSchoolTeacherService.execute(filters);

    return response.json(filteredList);
  }
}

export { ListSchoolTeacherController };
