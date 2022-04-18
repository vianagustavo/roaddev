import { Request, Response } from "express";
import { ITeacherClassFilter } from "../../domain/requestDto";
import { ListTeacherClassService } from "../../services/TeacherClass/ListTeacherClassService";

class ListTeacherClassController {
  async handle(request: Request, response: Response) {
    const filters: ITeacherClassFilter = request.query;
    const listTeacherClassService = new ListTeacherClassService();
    const filteredList = await listTeacherClassService.execute(filters);

    return response.json(filteredList);
  }
}

export { ListTeacherClassController };
