import type MockAdapter from "axios-mock-adapter";
import {
  IEnrollmentType,
  ITokenResponse
} from "../../../src/integrations/prismaone";
import { getMockedJwt } from "./Helper";

export function successLogin(mock: MockAdapter) {
  const tokenMockResponse: ITokenResponse = {
    token: getMockedJwt()
  };
  mock
    .onPost("/auth/user/login", {
      login: "admin",
      password: "admin"
    })
    .reply(200, tokenMockResponse);
}

export function successGetEnrollment(mock: MockAdapter, enrollment: string) {
  const studentMockResponse: IEnrollmentType = {
    enrollment: enrollment,
    status: true
  };
  mock.onGet(`/enrollments/${enrollment}`).reply(200, studentMockResponse);
}
