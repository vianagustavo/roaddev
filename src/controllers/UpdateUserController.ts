import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { login, oldPassword, newPassword } = request.body;
    const { user_id } = request;

    const updateUserService = new UpdateUserService();
    await updateUserService.execute({
      login,
      oldPassword,
      newPassword,
      id: user_id
    });
    const responseFinal = {
      message: "Password updated successfully!"
    };
    return response.json(responseFinal);
  }
}

export { UpdateUserController };
