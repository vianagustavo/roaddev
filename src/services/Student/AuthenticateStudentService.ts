import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { InvalidArgument } from "../../app";
import { IAuthenticateStudentRequest } from "../../domain/requestDto";
import { Student } from "../../entities/Student";
import { myCache } from "../../nodeCacheConfig";
import { StudentRepository } from "../../repositories/StudentRepositories";

async function getStudent({
  enrollment,
  loginPassword
}: IAuthenticateStudentRequest) {
  const student = await StudentRepository.findOne({
    where: { enrollment },
    select: { id: true, password: true, enrollment: true }
  });

  if (!student) {
    throw new Error("Enrollment/Password incorrect");
  }
  const passwordMatch = await compare(loginPassword, student.password);

  if (!passwordMatch) {
    throw new InvalidArgument("Enrollment/Password incorrect");
  }
  myCache.set(`student-${student.enrollment}`, student, 3600);
  return student;
}

class AuthenticateStudentService {
  async execute({ enrollment, loginPassword }: IAuthenticateStudentRequest) {
    let student: Student | undefined = myCache.get(`student-${enrollment}`);

    if (!student) {
      student = await getStudent({
        enrollment,
        loginPassword
      });
    }
    const passwordMatch = await compare(loginPassword, student.password);

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
