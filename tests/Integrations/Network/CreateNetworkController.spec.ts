import request from "supertest";
import app from "../../../src/app";

describe("Create Network Controller", () => {
  it("Should be able to create a new network", async () => {
    const network = {
      name: "Test Name"
    };
    const response = await request(app).post("/networks").send(network);
    expect(response.status).toBe(200);
  });
});
