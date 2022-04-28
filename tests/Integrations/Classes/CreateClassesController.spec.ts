import { createNetwork, createSchool } from "../Helpers/Helper";
import {
  mockIClassRequest,
  mockINetworkRequest,
  mockISchoolRequest
} from "../Helpers/Mock";
import request from "supertest";
import app from "../../../src/app";

describe("Create Classes Controller", () => {
  it("Should be able to create a new class", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const classes = mockIClassRequest(createSchoolResponseBody.id);

    const response = await request(app).post("/classes").send(classes);
    expect(response.status).toBe(200);
  });
});
