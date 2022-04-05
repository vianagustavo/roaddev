import { AppDataSource } from "../data-source";
import { Student } from "../entities/Student";

export const StudentRepository = AppDataSource.getRepository(Student);
