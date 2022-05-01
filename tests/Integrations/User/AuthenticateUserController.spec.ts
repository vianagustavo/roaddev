import request from "supertest";
import app from "../../../src/app";
import { superAppRequest } from "../../setup";
import { createUser } from "../Helpers/Helper";
import { mockIUserRequest } from "../Helpers/Mock";

describe("Authenticate User Controller", () => {
  it("Should be able to authenticate an existing user", async () => {
    const createUserRequest = mockIUserRequest();
    await createUser(createUserRequest);

    const response = await superAppRequest.post("/login/admin").send({
      login: createUserRequest.login,
      password: createUserRequest.password
    });
    expect(response.status).toBe(200);
  });
});
