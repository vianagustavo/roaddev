import { superAppRequest } from "../../setup";
import { createNetwork, createSchool } from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockIStudentRequest
} from "../Helpers/Mock";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { successGetEnrollment, successLogin } from "../Helpers/AxiosMock";

describe("Create Student Controller", () => {
  it("Should be able to create a new student", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const student = mockIStudentRequest(createSchoolResponseBody.id);
    const mock = new MockAdapter(axios);
    successLogin(mock);
    successGetEnrollment(mock, student.enrollment);

    const response = await superAppRequest.post("/students").send(student);
    expect(response.status).toBe(200);
  });
});
