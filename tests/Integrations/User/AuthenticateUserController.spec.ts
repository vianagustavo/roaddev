import {
  CreateUserService,
  IUserRequest
} from "../../../src/services/User/CreateUserService";
import request from "supertest";
import app from "../../../src/app";

describe("Authenticate User Controller", () => {
  it("Should be able to authenticate an existing user", async () => {
    const createUserService = new CreateUserService();
    const userData: IUserRequest = {
      name: "Test Name",
      login: "Test",
      password: "admin",
      admin: false
    };
    const user = await createUserService.execute(userData);

    const response = await request(app)
      .post("/login")
      .send({ login: user.login, password: userData.password });
    expect(response.status).toBe(200);
  });
});
