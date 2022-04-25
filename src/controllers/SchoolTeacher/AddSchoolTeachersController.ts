import { Request, Response } from "express";
import { AddSchoolTeacherService } from "../../services/SchoolTeacher/AddSchoolTeachersService";

class AddSchoolTeacherController {
  async handle(request: Request, response: Response) {
    const { schoolId, teacherId } = request.body;
    const addSchoolTeacherService = new AddSchoolTeacherService();
    const addSchoolTeacher = await addSchoolTeacherService.execute({
      schoolId,
      teacherId
    });
    return response.json(addSchoolTeacher);
  }
}

export { AddSchoolTeacherController };
