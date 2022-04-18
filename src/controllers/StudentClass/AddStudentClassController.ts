import { Request, Response } from "express";
import { AddStudentClassService } from "../../services/StudentClass/AddStudentClassService";

class AddStudentClassController {
  async handle(request: Request, response: Response) {
    const { studentId, classId } = request.body;

    const addStudentClassService = new AddStudentClassService();
    const addStudentClass = await addStudentClassService.execute({
      classId,
      studentId
    });
    return response.json(addStudentClass);
  }
}

export { AddStudentClassController };
