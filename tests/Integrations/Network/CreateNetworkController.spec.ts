import request from "supertest";
import app from "../../../src/app";
import { mockINetworkRequest } from "../Helpers/Mock";

describe("Create Network Controller", () => {
  it("Should be able to create a new network", async () => {
    const network = mockINetworkRequest();
    const response = await request(app).post("/networks").send(network);
    expect(response.status).toBe(200);
  });
});
