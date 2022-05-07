import { Request, Response } from "express";
import { IAuthenticateStudentRequest } from "../../domain/requestDto";
import { AuthenticateStudentService } from "../../services/Student/AuthenticateStudentService";

class AuthenticateStudentController {
  async handle(request: Request, response: Response) {
    const { enrollment, loginPassword }: IAuthenticateStudentRequest =
      request.body;

    const authenticateStudentService = new AuthenticateStudentService();
    const tokenJwt = await authenticateStudentService.execute({
      enrollment,
      loginPassword
    });

    const responseJwt = {
      token: tokenJwt
    };

    return response.json(responseJwt);
  }
}

export { AuthenticateStudentController };
