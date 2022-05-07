import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { InvalidArgument } from "../../app";
import { Student } from "../../entities/Student";
import { myCache } from "../../nodeCacheConfig";
import { StudentRepository } from "../../repositories/StudentRepositories";

interface IAuthenticateRequest {
  enrollment: string;
  password: string;
}

async function getStudent(enrollment: string, password: string) {
  const student = await StudentRepository.findOne({
    where: { enrollment },
    select: { id: true, password: true, enrollment: true }
  });

  if (!student) {
    throw new Error("Enrollment/Password incorrect");
  }
  const passwordMatch = await compare(password, student.password);

  if (!passwordMatch) {
    throw new InvalidArgument("Enrollment/Password incorrect");
  }
  myCache.set(`student-${student.enrollment}`, student, 3600);
  return student;
}

class AuthenticateStudentService {
  async execute(authenticateRequest: IAuthenticateRequest) {
    let student: Student | undefined = myCache.get(
      `student-${authenticateRequest.enrollment}`
    );

    if (!student) {
      student = await getStudent(
        authenticateRequest.enrollment,
        authenticateRequest.password
      );
    }

    const passwordMatch = await compare(
      authenticateRequest.password,
      student.password
    );

    if (!passwordMatch) {
      throw new InvalidArgument("Enrollment/Password incorrect");
    }

    const token = sign(
      {
        id: student.id
      },
      `${process.env.STUDENT_SECRET}`,
      {
        subject: student.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export { AuthenticateStudentService };
