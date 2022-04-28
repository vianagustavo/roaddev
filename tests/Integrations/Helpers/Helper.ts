import app from "../../../src/app";
import {
  ICreateUserResponse,
  IUserRequest
} from "../../../src/domain/requestDto";
import request from "supertest";

export async function createUser(body: IUserRequest) {
  const createUserResponse = await request(app).post("/users").send(body);
  const createUserResponseBody = createUserResponse.body as ICreateUserResponse;

  return createUserResponseBody;
}
