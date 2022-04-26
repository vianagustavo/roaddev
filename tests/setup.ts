import { AppDataSource } from "../src/data-source";

process.env.DB_DATABASE = "roaddevtests";
process.env.ENVIRONMENT = "test";

beforeAll(() => {
  return AppDataSource.initialize();
});

afterAll(() => {
  return AppDataSource.dropDatabase();
});
