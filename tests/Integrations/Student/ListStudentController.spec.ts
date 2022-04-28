import faker from "@faker-js/faker";
import request from "supertest";
import app from "../../../src/app";
import {
  IAuthenticateUserRequest,
  IAuthenticateUserResponse,
  ISchoolRequest,
  IStudentRequest
} from "../../../src/domain/requestDto";
import {
  createNetwork,
  createSchool,
  createStudent,
  createUser
} from "../Helpers/Helper";
import { mockINetworkRequest, mockIUserRequest } from "../Helpers/Mock";

describe("List Student Controller", () => {
  it("Should be able to list students", async () => {
    const createUserRequest = mockIUserRequest();
    const createUserResponseBody = await createUser(createUserRequest);
    const userAuthenticate: IAuthenticateUserRequest = {
      login: createUserResponseBody.login,
      password: createUserRequest.password
    };
    const authenticateUserResponse = await request(app)
      .post("/login")
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

    const studentRequest: IStudentRequest = {
      birthDate: faker.date.past(10, "2017-01-01T00:00:00.000Z"),
      schoolId: createSchoolResponseBody.id,
      name: faker.name.findName(),
      fatherName: faker.name.findName(),
      motherName: faker.name.findName(),
      password: faker.random.words()
    };

    await createStudent(studentRequest);

    const response = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${authenticateResponseBody.token}`);
    expect(response.status).toBe(200);
  });
});
