import { Request, Response } from "express";
import { IStudentClassFilter } from "../../domain/requestDto";
import { ListStudentClassService } from "../../services/StudentClass/ListStudentClassService";

class ListStudentClassController {
  async handle(request: Request, response: Response) {
    const filters: IStudentClassFilter = request.query;
    const listStudentClassService = new ListStudentClassService();
    const filteredList = await listStudentClassService.execute(filters);

    return response.json(filteredList);
  }
}

export { ListStudentClassController };
