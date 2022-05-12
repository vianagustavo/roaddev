import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const environment = process.env.ENVIRONMENT;

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  synchronize: false,
  logging: !(environment === "test"),
  migrationsRun: true,
  ssl: environment === "main"
};

export const AppDataSource = new DataSource(config);
