import { Request, Response } from "express";
import { IStudentDbFilter } from "../../domain/requestDto";
import { ListStudentService } from "../../services/Student/ListStudentService";

class ListStudentController {
  async handle(request: Request, response: Response) {
    const filters: IStudentDbFilter = request.query;
    const listStudentService = new ListStudentService();
    const students = await listStudentService.execute(filters);

    return response.json(students);
  }
}

export { ListStudentController };
