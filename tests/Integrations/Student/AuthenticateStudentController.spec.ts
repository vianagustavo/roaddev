import { superAppRequest } from "../../setup";
import { createNetwork, createSchool, createStudent } from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockIStudentRequest
} from "../Helpers/Mock";

describe("Authenticate Student Controller", () => {
  it("Should be able to authenticate an existing student", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const student = mockIStudentRequest(createSchoolResponseBody.id);
    const createStudentResponse = await createStudent(student);

    const response = await superAppRequest.post("/login/student").send({
      enrollment: createStudentResponse.enrollment,
      password: student.loginPassword
    });
    expect(response.status).toBe(200);
  });
});
