import { AppDataSource } from "../data-source";
import { School } from "../entities/School";

export const SchoolRepository = AppDataSource.getRepository(School);
