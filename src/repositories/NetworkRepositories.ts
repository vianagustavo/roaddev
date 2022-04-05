import { AppDataSource } from "../data-source";
import { Network } from "../entities/Network";

export const NetworkRepository = AppDataSource.getRepository(Network);
