import { Request, Response } from "express";
import {
  CreateStudentService,
  IStudentRequest
} from "../../services/Student/CreateStudentService";

class CreateStudentController {
  async handle(request: Request, response: Response) {
    const {
      schoolId,
      name,
      birthDate,
      fatherName,
      motherName,
      password
    }: IStudentRequest = request.body;
    const createStudentService = new CreateStudentService();
    const student = await createStudentService.execute({
      schoolId,
      name,
      birthDate,
      fatherName,
      motherName,
      password
    });

    return response.json(student);
  }
}

export { CreateStudentController };
