import { Request, Response } from "express";
import { IUserRequest } from "../../domain/requestDto";
import { CreateUserService } from "../../services/User/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, login, loginPassword, admin }: IUserRequest = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      login,
      loginPassword,
      admin
    });

    return response.json(user);
  }
}

export { CreateUserController };
