import request from "supertest";
import app from "../../../src/app";
import { createNetwork, createSchool } from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockIStudentRequest
} from "../Helpers/Mock";

describe("Create Student Controller", () => {
  it("Should be able to create a new student", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const student = mockIStudentRequest(createSchoolResponseBody.id);

    const response = await request(app).post("/students").send(student);
    expect(response.status).toBe(200);
  });
});
