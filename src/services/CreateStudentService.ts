import { StudentRepository } from "../repositories/StudentRepositories";
import { InvalidArgument } from "../app";
import { hash } from "bcryptjs";

export interface IStudentRequest {
  schoolId: string;
  name: string;
  birthDate: string;
  fatherName: string;
  motherName: string;
  password: string;
}

async function generateValidEnrollment() {
  const enrollment =
    Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
  const enrollmentAlreadyExists = await StudentRepository.findOne({
    where: { enrollment }
  });
  if (enrollmentAlreadyExists) {
    return null;
  }
  return enrollment;
}

async function getEnrollment() {
  let enrollment = await generateValidEnrollment();
  while (enrollment === null) {
    enrollment = await generateValidEnrollment();
  }
  return enrollment;
}

class CreateStudentService {
  async execute({
    schoolId,
    name,
    birthDate,
    fatherName,
    motherName,
    password
  }: IStudentRequest) {
    const studentAlreadyExists = await StudentRepository.findOne({
      where: { name }
    });
    if (studentAlreadyExists) {
      throw new InvalidArgument("Student already enrolled!");
    }
    const enrollment = await getEnrollment();

    const passwordHash = await hash(password, 8);
    const student = StudentRepository.create({
      schoolId,
      name,
      birthDate,
      fatherName,
      motherName,
      password: passwordHash,
      enrollment
    });

    await StudentRepository.save(student);

    return student;
  }
}

export { CreateStudentService };
