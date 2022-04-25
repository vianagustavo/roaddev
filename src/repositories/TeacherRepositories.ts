import { AppDataSource } from "../data-source";
import { Teacher } from "../entities/Teacher";

export const TeacherRepository = AppDataSource.getRepository(Teacher);
