import { Request, Response } from "express";
import { CreateSchoolService } from "../../services/School/CreateSchoolService";

class CreateSchoolController {
  async handle(request: Request, response: Response) {
    const { networkId, name, address } = request.body;

    const createSchoolService = new CreateSchoolService();
    const school = await createSchoolService.execute({
      networkId,
      name,
      address
    });

    return response.json(school);
  }
}

export { CreateSchoolController };
