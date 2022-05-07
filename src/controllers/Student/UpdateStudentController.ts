import { Request, Response } from "express";
import {
  IStudentIdWithRequest,
  IUpdateStudentRequest
} from "../../domain/requestDto";
import { UpdateStudentService } from "../../services/Student/UpdateStudentService";

class UpdateStudentController {
  async handle(request: Request, response: Response) {
    const { oldPassword, newPassword }: IUpdateStudentRequest = request.body;
    const { student_id } = request as IStudentIdWithRequest;
    const updateStudentService = new UpdateStudentService();
    await updateStudentService.execute({
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
