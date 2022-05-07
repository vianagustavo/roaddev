import { Request, Response } from "express";
import { IStudentRequest } from "../../domain/requestDto";
import { CreateStudentService } from "../../services/Student/CreateStudentService";

class CreateStudentController {
  async handle(request: Request, response: Response) {
    const {
      schoolId,
      name,
      birthDate,
      fatherName,
      motherName,
      loginPassword: createPassword,
      enrollment
    }: IStudentRequest = request.body;
    const createStudentService = new CreateStudentService();
    const student = await createStudentService.execute({
      schoolId,
      name,
      birthDate,
      fatherName,
      motherName,
      loginPassword: createPassword,
      enrollment
    });

    return response.json(student);
  }
}

export { CreateStudentController };
