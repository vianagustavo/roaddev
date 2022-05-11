import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Classes } from "./entities/Classes";
import { Network } from "./entities/Network";
import { School } from "./entities/School";
import { Student } from "./entities/Student";
import { Teacher } from "./entities/Teacher";
import { User } from "./entities/User";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Network, School, Student, Classes, Teacher],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
  logging: !(process.env.ENVIRONMENT === "test"),
  migrationsRun: true
};

export const AppDataSource = new DataSource(config);
