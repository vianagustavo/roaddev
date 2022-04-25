import { Request, Response } from "express";
import { AuthenticateStudentService } from "../../services/Student/AuthenticateStudentService";

class AuthenticateStudentController {
  async handle(request: Request, response: Response) {
    const { enrollment, password } = request.body;

    const authenticateStudentService = new AuthenticateStudentService();
    const tokenJwt = await authenticateStudentService.execute({
      enrollment,
      password
    });

    const responseJwt = {
      token: tokenJwt
    };

    return response.json(responseJwt);
  }
}

export { AuthenticateStudentController };
