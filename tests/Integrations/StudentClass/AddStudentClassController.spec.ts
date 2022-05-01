import { superAppRequest } from "../../setup";
import {
  createClass,
  createNetwork,
  createSchool,
  createStudent
} from "../Helpers/Helper";
import {
  mockIClassRequest,
  mockINetworkRequest,
  mockISchoolRequest,
  mockIStudentRequest
} from "../Helpers/Mock";

describe("Add StudentClass Controller", () => {
  it("Should be able to add new Student-Class", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const createSchoolRequest = mockISchoolRequest(
      createNetworkResponseBody.id
    );
    const createSchoolResponseBody = await createSchool(createSchoolRequest);

    const createStudentRequest = mockIStudentRequest(
      createSchoolResponseBody.id
    );
    const createStudentResponseBody = await createStudent(createStudentRequest);

    const createClassRequest = mockIClassRequest(createSchoolResponseBody.id);
    const createClassResponseBody = await createClass(createClassRequest);

    const response = await superAppRequest.post("/student-class").send({
      studentId: createStudentResponseBody.id,
      classId: createClassResponseBody.id
    });
    expect(response.status).toBe(200);
  });
});
