import "reflect-metadata";
import { DataSource } from "typeorm";
import { Network } from "./entities/Network";
import { School } from "./entities/School";
import { Student } from "./entities/Student";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "roaddev",
  entities: [User, Network, School, Student],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
  logging: false
});
