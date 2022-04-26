import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Classes } from "./entities/Classes";
import { Network } from "./entities/Network";
import { School } from "./entities/School";
import { Student } from "./entities/Student";
import { Teacher } from "./entities/Teacher";
import { User } from "./entities/User";

const databaseName =
  process.env.ENVIRONMENT === "test" ? "roaddevtests" : "roaddev";
console.log({ databaseName });
const config: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: databaseName,
  entities: [User, Network, School, Student, Classes, Teacher],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
  logging: true,
  migrationsRun: true
};

export const AppDataSource = new DataSource(config);
