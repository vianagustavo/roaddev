import { compare, hash } from "bcryptjs";
import { InvalidArgument } from "../../app";
import { StudentRepository } from "../../repositories/StudentRepositories";

interface IAuthenticateRequest {
  enrollment: string;
  oldPassword: string;
  newPassword: string;
  id: string;
}

class UpdateStudentService {
  async execute({ oldPassword, newPassword, id }: IAuthenticateRequest) {
    const student = await StudentRepository.findOne({
      where: { id },
      select: {
        enrollment: true,
        id: true,
        birthDate: true,
        fatherName: true,
        motherName: true,
        name: true,
        password: true
      }
    });

    if (!student) {
      throw new InvalidArgument("Enrollment/Password incorrect");
    }

    const passwordMatch = await compare(oldPassword, student.password);

    if (!passwordMatch) {
      throw new InvalidArgument("Enrollment/Password incorrect");
    }
    const passwordHash = await hash(newPassword, 8);
    student.password = passwordHash;
    await StudentRepository.save(student);
    return student;
  }
}

export { UpdateStudentService };
