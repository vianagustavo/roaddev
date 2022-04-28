import request from "supertest";
import app from "../../../src/app";
import { mockITeacherRequest } from "../Helpers/Mock";

describe("Create Teacher Controller", () => {
  it("Should be able to create a new teacher", async () => {
    const teacher = mockITeacherRequest();

    const response = await request(app).post("/teachers").send(teacher);
    expect(response.status).toBe(200);
  });
});
