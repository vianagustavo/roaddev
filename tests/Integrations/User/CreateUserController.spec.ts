import { mockIUserRequest } from "../Helpers/Mock";
import { superAppRequest } from "../../setup";
import "express-async-errors";

describe("Create User Controller", () => {
  it("Should be able to create a new user2", async () => {
    const user = mockIUserRequest();
    const response = await superAppRequest.post("/users").send(user);
    expect(response.status).toBe(200);
  });
  // it("Should not be able to create an user without login", async () => {
  //   const response = await superAppRequest.post("/users").send({
  //     name: "Test",
  //     login: "",
  //     loginPassword: "1234",
  //     admin: false
  //   });
  //   expect(response.status).toBe(400);
  // });
});
