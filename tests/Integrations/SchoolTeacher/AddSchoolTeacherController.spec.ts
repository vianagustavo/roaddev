import { superAppRequest } from "../../setup";
import { createNetwork, createSchool, createTeacher } from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockITeacherRequest
} from "../Helpers/Mock";

describe("Add SchoolTeacher Controller", () => {
  it("Should be able to add new School-Teacher", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const createSchoolRequest = mockISchoolRequest(
      createNetworkResponseBody.id
    );
    const createSchoolResponseBody = await createSchool(createSchoolRequest);

    const createTeacherRequest = mockITeacherRequest();
    const createTeacherResponseBody = await createTeacher(createTeacherRequest);

    const response = await superAppRequest.post("/school-teacher").send({
      schoolId: createSchoolResponseBody.id,
      teacherId: createTeacherResponseBody.id
    });
    expect(response.status).toBe(200);
  });
});
