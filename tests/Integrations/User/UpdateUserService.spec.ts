import request from "supertest";
import app from "../../../src/app";
import {
  IAuthenticateUserRequest,
  IAuthenticateUserResponse,
  IUserRequest
} from "../../../src/domain/requestDto";
import faker from "@faker-js/faker";
import { createUser } from "../Helpers/Helper";
import { mockIUserRequest } from "../Helpers/Mock";

describe("Authenticate User Controller", () => {
  it("Should be able to update an existing user", async () => {
    const createUserRequest = mockIUserRequest();
    const createUserResponseBody = await createUser(createUserRequest);

    const newPassword = "1234";

    const userAuthenticate: IAuthenticateUserRequest = {
      login: createUserResponseBody.login,
      password: createUserRequest.password
    };

    const authenticateUserResponse = await request(app)
      .post("/login")
      .send(userAuthenticate);
    const authenticateResponseBody =
      authenticateUserResponse.body as IAuthenticateUserResponse;

    const response = await request(app)
      .put("/users")
      .set("Authorization", `Bearer ${authenticateResponseBody.token}`)
      .send({
        login: createUserResponseBody.login,
        oldPassword: createUserRequest.password,
        newPassword
      });
    expect(response.status).toBe(200);
  });
});
