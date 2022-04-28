import request from "supertest";
import app from "../../../src/app";
import { IAuthenticateUserRequest } from "../../../src/domain/requestDto";
import {
  authenticateUser,
  createNetwork,
  createSchool,
  createUser
} from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockIUserRequest
} from "../Helpers/Mock";

describe("List School Controller", () => {
  it("Should be able to list schools", async () => {
    const createUserRequest = mockIUserRequest();
    const createUserResponseBody = await createUser(createUserRequest);
    const userAuthenticate: IAuthenticateUserRequest = {
      login: createUserResponseBody.login,
      password: createUserRequest.password
    };
    const authenticateUserResponse = await authenticateUser(userAuthenticate);

    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    await createSchool(schoolRequest);

    const response = await request(app)
      .get("/schools")
      .set("Authorization", `Bearer ${authenticateUserResponse.token}`);
    expect(response.status).toBe(200);
  });
});
