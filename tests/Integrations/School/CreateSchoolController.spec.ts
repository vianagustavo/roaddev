import request from "supertest";
import app from "../../../src/app";
import { CreateNetworkService } from "../../../src/services/Network/CreateNetworkService";
import { ISchoolRequest } from "../../../src/services/School/CreateSchoolService";

describe("Create School Controller", () => {
  it("Should be able to create a new school", async () => {
    const createNetworkService = new CreateNetworkService();
    const network = await createNetworkService.execute("TestNework");

    const school: ISchoolRequest = {
      name: "Test Name",
      address: "Test Adress",
      id: network.id
    };
    const response = await request(app).post("/networks").send(school);
    expect(response.status).toBe(200);
  });
});
