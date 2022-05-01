import { superAppRequest } from "../../setup";
import {
  createClass,
  createNetwork,
  createSchool,
  createTeacher
} from "../Helpers/Helper";
import {
  mockIClassRequest,
  mockINetworkRequest,
  mockISchoolRequest,
  mockITeacherRequest
} from "../Helpers/Mock";

describe("Add TeacherClass Controller", () => {
  it("Should be able to add new Teacher-Class", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const createClassRequest = mockIClassRequest(createSchoolResponseBody.id);
    const createClassResponseBody = await createClass(createClassRequest);

    const createTeacherRequest = mockITeacherRequest();
    const createTeacherResponseBody = await createTeacher(createTeacherRequest);

    const response = await superAppRequest.post("/teacher-class").send({
      teacherId: createTeacherResponseBody.id,
      classId: createClassResponseBody.id
    });
    expect(response.status).toBe(200);
  });
});
