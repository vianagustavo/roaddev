import { Request, Response } from "express";
import { IUserIdWithRequest } from "../../domain/requestDto";
import { UpdateUserService } from "../../services/User/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { login, oldPassword, newPassword } = request.body;
    const { user_id } = request as IUserIdWithRequest;

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
