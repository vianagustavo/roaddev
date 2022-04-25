import { Request, Response } from "express";
import { CreateTeacherService } from "../../services/Teacher/CreateTeacherService";

class CreateTeacherController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTeacherService = new CreateTeacherService();
    const teacher = await createTeacherService.execute(name);
    return response.json(teacher);
  }
}

export { CreateTeacherController };
