import { Request, Response } from "express";
import { AddTeacherClassService } from "../../services/TeacherClass/AddTeacherClass";

class AddTeacherClassController {
  async handle(request: Request, response: Response) {
    const { teacherId, classId } = request.body;

    const addTeacherClassService = new AddTeacherClassService();
    const addTeacherClass = await addTeacherClassService.execute({
      classId,
      teacherId
    });
    return response.json(addTeacherClass);
  }
}

export { AddTeacherClassController };
