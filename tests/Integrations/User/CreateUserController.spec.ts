import app from "../../../src/app";
import request from "supertest";
import faker from "@faker-js/faker";
import { IUserRequest } from "../../../src/services/User/CreateUserService";

describe("Create User Controller", () => {
  it("Should be able to create a new user2", async () => {
    const user: IUserRequest = {
      name: "Test Name",
      login: faker.internet.userName(),
      password: "admin",
      admin: false
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(200);
  });
  // it("Should not be able to create an user without login", async () => {
  //   const response = await request(app).post("/users").send({
  //     name: "Test",
  //     login: "",
  //     password: "1234",
  //     admin: false
  //   });
  //   expect(response.status).toBe(400);
  // });
});
