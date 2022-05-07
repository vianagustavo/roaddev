import axios from "axios";
import { superAppRequest } from "../../setup";
import { successGetEnrollment, successLogin } from "../Helpers/AxiosMock";
import {
  createClass,
  createNetwork,
  createSchool,
  createStudent
} from "../Helpers/Helper";
import {
  mockIClassRequest,
  mockINetworkRequest,
  mockISchoolRequest,
  mockIStudentRequest
} from "../Helpers/Mock";
import MockAdapter from "axios-mock-adapter";

describe("Add StudentClass Controller", () => {
  it("Should be able to add new Student-Class", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const createSchoolRequest = mockISchoolRequest(
      createNetworkResponseBody.id
    );
    const createSchoolResponseBody = await createSchool(createSchoolRequest);

    const createStudentRequest = mockIStudentRequest(
      createSchoolResponseBody.id
    );
    const mock = new MockAdapter(axios);
    successLogin(mock);
    successGetEnrollment(mock, createStudentRequest.enrollment);
    const createStudentResponseBody = await createStudent(createStudentRequest);

    const createClassRequest = mockIClassRequest(createSchoolResponseBody.id);
    const createClassResponseBody = await createClass(createClassRequest);

    const response = await superAppRequest.post("/student-class").send({
      studentId: createStudentResponseBody.id,
      classId: createClassResponseBody.id
    });
    expect(response.status).toBe(200);
  });
});
