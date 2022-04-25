import { Request, Response } from "express";
import { CreateClassesService } from "../../services/Classes/CreateClassesService";

class CreateClassesController {
  async handle(request: Request, response: Response) {
    const { name, schoolId, classDay, classStart, classEnd } = request.body;

    const createClassesService = new CreateClassesService();
    const classes = await createClassesService.execute({
      name,
      schoolId,
      classDay,
      classStart,
      classEnd
    });

    return response.json(classes);
  }
}

export { CreateClassesController };
