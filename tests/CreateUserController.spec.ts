import app from "../src/app";
import request from "supertest";
import faker from "@faker-js/faker";

describe("Create User Controller", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Test Name",
      login: faker.internet.userName(),
      password: "admin",
      admin: false
    });
  });
});
