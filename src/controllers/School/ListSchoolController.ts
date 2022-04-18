import { ISchoolDbFilter } from "../../domain/requestDto";
import { Request, Response } from "express";
import { ListSchoolService } from "../../services/School/ListSchoolService";

class ListSchoolController {
  async handle(request: Request, response: Response) {
    const filters: ISchoolDbFilter = request.query;
    const listSchoolService = new ListSchoolService();
    const schools = await listSchoolService.execute(filters);

    return response.json(schools);
  }
}

export { ListSchoolController };
