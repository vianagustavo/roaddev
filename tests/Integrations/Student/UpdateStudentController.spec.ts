import { superAppRequest } from "../../setup";
import { successGetEnrollment, successLogin } from "../Helpers/AxiosMock";
import {
  authenticateStudent,
  createNetwork,
  createSchool,
  createStudent
} from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockIStudentRequest
} from "../Helpers/Mock";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe("Authenticate Student Controller", () => {
  it("Should be able to update an existing student", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const student = mockIStudentRequest(createSchoolResponseBody.id);
    const mock = new MockAdapter(axios);
    successLogin(mock);
    successGetEnrollment(mock, student.enrollment);
    const createStudentResponse = await createStudent(student);
    const authenticateStudentResponse = await authenticateStudent({
      enrollment: createStudentResponse.enrollment,
      loginPassword: student.createPassword
    });
    const newPassword = "1234";
    const response = await superAppRequest
      .put("/students")
      .set("Authorization", `Bearer ${authenticateStudentResponse.token}`)
      .send({
        enrollment: createStudentResponse.enrollment,
        oldPassword: student.createPassword,
        newPassword
      });
    expect(response.status).toBe(200);
    const authenticateUpdatedStudentResponse = await authenticateStudent({
      enrollment: createStudentResponse.enrollment,
      loginPassword: newPassword
    });
    expect(authenticateUpdatedStudentResponse.token).not.toBeNull();
  });
});
