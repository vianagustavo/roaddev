import { InvalidArgument } from "../../src/app";
import {
  CreateUserService,
  IUserRequest
} from "../../src/services/User/CreateUserService";

describe("Create User", () => {
  let createUserService: CreateUserService;
  beforeAll(() => {
    createUserService = new CreateUserService();
  });

  it("Should be able to create a new user", async () => {
    const userData: IUserRequest = {
      name: "Test Name",
      login: "Test",
      password: "admin",
      admin: false
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    const userData: IUserRequest = {
      name: "Test Existing Name",
      login: "Test2",
      password: "admin",
      admin: false
    };

    await createUserService.execute(userData);
    await expect(createUserService.execute(userData)).rejects.toEqual(
      new InvalidArgument("User already exists")
    );
  });
});
