import request from "supertest";
import app from "../../../src/app";
import { IAuthenticateUserRequest } from "../../../src/domain/requestDto";
import { superAppRequest } from "../../setup";
import { authenticateUser, createUser } from "../Helpers/Helper";
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

    const authenticateUserResponse = await authenticateUser(userAuthenticate);

    const response = await superAppRequest
      .put("/users")
      .set("Authorization", `Bearer ${authenticateUserResponse.token}`)
      .send({
        login: createUserResponseBody.login,
        oldPassword: createUserRequest.password,
        newPassword
      });
    expect(response.status).toBe(200);
  });
});
