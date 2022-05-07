import { superAppRequest } from "../../setup";
import { createNetwork, createSchool, createStudent } from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockIStudentRequest
} from "../Helpers/Mock";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { successGetEnrollment, successLogin } from "../Helpers/AxiosMock";
import { IAuthenticateStudentRequest } from "../../../src/domain/requestDto";

describe("Authenticate Student Controller", () => {
  it("Should be able to authenticate an existing student", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const student = mockIStudentRequest(createSchoolResponseBody.id);
    const mock = new MockAdapter(axios);
    successLogin(mock);
    successGetEnrollment(mock, student.enrollment);
    const createStudentResponse = await createStudent(student);

    const requestBody: IAuthenticateStudentRequest = {
      enrollment: createStudentResponse.enrollment,
      loginPassword: student.loginPassword
    };
    const response = await superAppRequest
      .post("/login/student")
      .send(requestBody);
    expect(response.status).toBe(200);
  });
});
