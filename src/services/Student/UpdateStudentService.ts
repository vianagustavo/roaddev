import { compare, hash } from "bcryptjs";
import { InvalidArgument } from "../../app";
import { IUpdateStudentRequest } from "../../domain/requestDto";
import { myCache } from "../../nodeCacheConfig";
import { StudentRepository } from "../../repositories/StudentRepositories";

type UpdateStudent = IUpdateStudentRequest & { id: string };

class UpdateStudentService {
  async execute({ oldPassword, newPassword, id }: UpdateStudent) {
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
    console.log({ student });
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
    myCache.del(`student-${student.enrollment}`);
    return student;
  }
}

export { UpdateStudentService };
