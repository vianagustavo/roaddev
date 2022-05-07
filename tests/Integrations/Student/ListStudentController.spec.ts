import faker from "@faker-js/faker";
import {
  IAuthenticateUserRequest,
  IAuthenticateUserResponse,
  ISchoolRequest,
  IStudentRequest
} from "../../../src/domain/requestDto";
import { superAppRequest } from "../../setup";
import {
  createNetwork,
  createSchool,
  createStudent,
  createUser
} from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockIStudentRequest,
  mockIUserRequest
} from "../Helpers/Mock";

describe("List Student Controller", () => {
  it("Should be able to list students", async () => {
    const createUserRequest = mockIUserRequest();
    const createUserResponseBody = await createUser(createUserRequest);
    const userAuthenticate: IAuthenticateUserRequest = {
      login: createUserResponseBody.login,
      loginPassword: createUserRequest.loginPassword
    };
    const authenticateUserResponse = await superAppRequest
      .post("/login/admin")
      .send(userAuthenticate);
    const authenticateResponseBody =
      authenticateUserResponse.body as IAuthenticateUserResponse;

    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest: ISchoolRequest = {
      name: faker.internet.userName(),
      address: faker.address.streetAddress(),
      networkId: createNetworkResponseBody.id
    };
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const studentRequest = mockIStudentRequest(createSchoolResponseBody.id);
    await createStudent(studentRequest);

    const response = await superAppRequest
      .get("/students")
      .set("Authorization", `Bearer ${authenticateResponseBody.token}`);
    expect(response.status).toBe(200);
  });
});
