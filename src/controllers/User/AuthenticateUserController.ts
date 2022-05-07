import { Request, Response } from "express";
import { IAuthenticateUserRequest } from "../../domain/requestDto";
import { AuthenticateUserService } from "../../services/User/AuthenticateUser";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { login, loginPassword: password }: IAuthenticateUserRequest =
      request.body;

    const authenticateUserService = new AuthenticateUserService();
    const tokenJwt = await authenticateUserService.execute({ login, password });

    const responseJwt = {
      token: tokenJwt
    };

    return response.json(responseJwt);
  }
}

export { AuthenticateUserController };
