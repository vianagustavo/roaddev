import { StudentRepository } from "../../repositories/StudentRepositories";
import { InvalidArgument } from "../../app";
import { hash } from "bcryptjs";
import { SchoolRepository } from "../../repositories/SchoolRepositories";
import { IStudentRequest } from "../../domain/requestDto";
import {
  buildPrismaOneClient,
  PrismaOneIntegration
} from "../../integrations/prismaone";

function validateBirthDate(date: Date) {
  const studentDate = date.getFullYear();
  const now = new Date().getFullYear();
  if (now - studentDate < 5) {
    throw new InvalidArgument("Student is younger than 5 years old");
  }
}

class CreateStudentService {
  async execute({
    schoolId,
    enrollment,
    name,
    birthDate,
    fatherName,
    motherName,
    loginPassword: createPassword
  }: IStudentRequest) {
    const bday = new Date(birthDate);
    validateBirthDate(bday);

    const enrollmentExists = await StudentRepository.findOne({
      where: { enrollment }
    });

    if (enrollmentExists) {
      throw new InvalidArgument("Enrollment already exists.");
    }
    const studentAlreadyExists = await StudentRepository.findOne({
      where: { name }
    });
    if (studentAlreadyExists) {
      throw new InvalidArgument("Student already enrolled!");
    }
    const schoolExists = await SchoolRepository.findOne({
      where: { id: schoolId }
    });

    if (!schoolExists) {
      throw new InvalidArgument("Incorrect School");
    }
    const prismaOneClient = new PrismaOneIntegration(buildPrismaOneClient());
    const checkEnrollmentStatus = await prismaOneClient.getEnrollment(
      enrollment
    );

    console.log({ checkEnrollmentStatus });

    if (!checkEnrollmentStatus.status) {
      throw new InvalidArgument("Your enrollment is currently unactive.");
    }
    console.log(createPassword);
    const passwordHash = await hash(createPassword, 8);

    const student = StudentRepository.create({
      schoolId,
      name,
      birthDate: bday,
      fatherName,
      motherName,
      password: passwordHash,
      enrollment
    });

    await StudentRepository.save(student);

    const { password, ...newStudent } = student;

    return newStudent;
  }
}

export { CreateStudentService };
