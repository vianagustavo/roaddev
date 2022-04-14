import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { StudentRepository } from "../../repositories/StudentRepositories";

interface IAuthenticateRequest {
  enrollment: number;
  password: string;
}

class AuthenticateStudentService {
  async execute(authenticateRequest: IAuthenticateRequest) {
    const student = await StudentRepository.findOne({
      where: { enrollment: authenticateRequest.enrollment },
      select: { id: true, password: true }
    });
    console.log(student);
    if (!student) {
      throw new Error("Enrollment/Password incorrect");
    }

    const passwordMatch = await compare(
      authenticateRequest.password,
      student.password
    );

    if (!passwordMatch) {
      throw new Error("Enrollment/Password incorrect");
    }

    const token = sign(
      {
        id: student.id
      },
      "1319311480589d345931c9bcefc23b27",
      {
        subject: student.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export { AuthenticateStudentService };
