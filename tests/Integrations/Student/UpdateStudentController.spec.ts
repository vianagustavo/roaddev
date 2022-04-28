import request from "supertest";
import app from "../../../src/app";
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

describe("Authenticate Student Controller", () => {
  it("Should be able to update an existing student", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const student = mockIStudentRequest(createSchoolResponseBody.id);
    const createStudentResponse = await createStudent(student);
    const authenticateStudentResponse = await authenticateStudent({
      enrollment: createStudentResponse.enrollment,
      password: student.password
    });
    const newPassword = "1234";
    const response = await request(app)
      .put("/students")
      .set("Authorization", `Bearer ${authenticateStudentResponse.token}`)
      .send({
        enrollment: createStudentResponse.enrollment,
        oldPassword: student.password,
        newPassword
      });
    expect(response.status).toBe(200);
  });
});
