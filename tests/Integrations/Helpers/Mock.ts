import faker from "@faker-js/faker";
import { IUserRequest } from "../../../src/domain/requestDto";

export function mockIUserRequest() {
  const userData: IUserRequest = {
    name: faker.name.findName(),
    login: faker.internet.userName(),
    password: "admin",
    admin: false
  };

  return userData;
}
