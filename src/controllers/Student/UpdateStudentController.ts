import { Request, Response } from "express";
import { IStudentIdWithRequest } from "../../domain/requestDto";
import { UpdateStudentService } from "../../services/Student/UpdateStudentService";

class UpdateStudentController {
  async handle(request: Request, response: Response) {
    const { enrollment, oldPassword, newPassword } = request.body;
    const { student_id } = request as IStudentIdWithRequest;

    const updateStudentService = new UpdateStudentService();
    await updateStudentService.execute({
      enrollment,
      oldPassword,
      newPassword,
      id: student_id
    });
    const responseFinal = {
      message: "Password updated successfully!"
    };
    return response.json(responseFinal);
  }
}

export { UpdateStudentController };
