import { IAuthenticateUserRequest } from "../../../src/domain/requestDto";
import { superAppRequest } from "../../setup";
import {
  authenticateUser,
  createNetwork,
  createSchool,
  createUser,
  listSchools
} from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockIUserRequest
} from "../Helpers/Mock";

describe("List School Controller", () => {
  it("Should be able to list schools", async () => {
    const createUserRequest = mockIUserRequest();
    const createUserResponseBody = await createUser(createUserRequest);
    const userAuthenticate: IAuthenticateUserRequest = {
      login: createUserResponseBody.login,
      password: createUserRequest.password
    };
    const authenticateUserResponse = await authenticateUser(userAuthenticate);

    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    await createSchool(schoolRequest);

    const response = await superAppRequest
      .get("/schools")
      .set("Authorization", `Bearer ${authenticateUserResponse.token}`);
    expect(response.status).toBe(200);
  });
  it("Should be able to list filtered schools", async () => {
    const createUserRequest = mockIUserRequest();
    const createUserResponseBody = await createUser(createUserRequest);
    const userAuthenticate: IAuthenticateUserRequest = {
      login: createUserResponseBody.login,
      password: createUserRequest.password
    };
    const authenticateUserResponse = await authenticateUser(userAuthenticate);

    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolQuantity = 2;
    for (let index = 0; index < schoolQuantity; index++) {
      const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
      await createSchool(schoolRequest);
    }

    const listSchoolResponseBody = await listSchools(authenticateUserResponse, {
      networkId: createNetworkResponseBody.id
    });
    const checkNetworkId = listSchoolResponseBody.every(
      (school) => school.networkId === createNetworkResponseBody.id
    );
    expect(checkNetworkId).toBeTruthy();
    expect(listSchoolResponseBody.length).toBe(schoolQuantity);
  });
});
