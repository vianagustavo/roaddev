import { AppDataSource } from "../data-source";
import { Classes } from "../entities/Classes";

export const ClassesRepository = AppDataSource.getRepository(Classes);
