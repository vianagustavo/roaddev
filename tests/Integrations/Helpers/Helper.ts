import app from "../../../src/app";
import {
  IAuthenticateStudentRequest,
  IAuthenticateUserRequest,
  IAuthenticateUserResponse,
  IClassRequest,
  ICreateClassResponse,
  ICreateNetworkResponse,
  ICreateSchoolResponse,
  ICreateStudentResponse,
  ICreateUserResponse,
  INetworkRequest,
  ISchoolRequest,
  IStudentRequest,
  IUserRequest
} from "../../../src/domain/requestDto";
import request from "supertest";

export async function createUser(body: IUserRequest) {
  const createUserResponse = await request(app).post("/users").send(body);
  const createUserResponseBody = createUserResponse.body as ICreateUserResponse;
  return createUserResponseBody;
}

export async function createNetwork(body: INetworkRequest) {
  const createNetworkResponse = await request(app).post("/networks").send(body);
  const createNetworkResponseBody =
    createNetworkResponse.body as ICreateNetworkResponse;
  return createNetworkResponseBody;
}

export async function createSchool(body: ISchoolRequest) {
  const createSchoolResponse = await request(app).post("/schools").send(body);
  const createSchoolResponseBody =
    createSchoolResponse.body as ICreateSchoolResponse;
  return createSchoolResponseBody;
}

export async function createStudent(body: IStudentRequest) {
  const createStudentResponse = await request(app).post("/students").send(body);
  const createStudentResponseBody =
    createStudentResponse.body as ICreateStudentResponse;
  return createStudentResponseBody;
}

export async function createClass(body: IClassRequest) {
  const createClassResponse = await request(app).post("/classes").send(body);
  const createClassResponseBody =
    createClassResponse.body as ICreateClassResponse;
  return createClassResponseBody;
}

export async function authenticateUser(body: IAuthenticateUserRequest) {
  const authenticateUserResponse = await request(app)
    .post("/login/admin")
    .send(body);
  const authenticateResponseBody =
    authenticateUserResponse.body as IAuthenticateUserResponse;
  return authenticateResponseBody;
}

export async function authenticateStudent(body: IAuthenticateStudentRequest) {
  const authenticateStudentResponse = await request(app)
    .post("/login/student")
    .send(body);
  const authenticateResponseBody =
    authenticateStudentResponse.body as IAuthenticateUserResponse;
  return authenticateResponseBody;
}
