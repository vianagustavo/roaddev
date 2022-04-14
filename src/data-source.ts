import "reflect-metadata";
import { DataSource } from "typeorm";
import { Classes } from "./entities/Classes";
import { Network } from "./entities/Network";
import { School } from "./entities/School";
import { Student } from "./entities/Student";
import { Teacher } from "./entities/Teacher";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "roaddev",
  entities: [User, Network, School, Student, Classes, Teacher],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
  logging: false
});
