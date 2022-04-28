import request from "supertest";
import app from "../../../src/app";
import { createNetwork } from "../Helpers/Helper";
import { mockINetworkRequest, mockISchoolRequest } from "../Helpers/Mock";

describe("Create School Controller", () => {
  it("Should be able to create a new school", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const school = mockISchoolRequest(createNetworkResponseBody.id);

    const response = await request(app).post("/schools").send(school);
    expect(response.status).toBe(200);
  });
});
