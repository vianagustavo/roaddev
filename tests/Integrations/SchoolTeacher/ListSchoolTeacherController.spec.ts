import { superAppRequest } from "../../setup";
import {
  createNetwork,
  createSchool,
  createTeacher,
  listSchoolTeacher
} from "../Helpers/Helper";
import {
  mockINetworkRequest,
  mockISchoolRequest,
  mockITeacherRequest
} from "../Helpers/Mock";

describe("List SchoolTeacher Controller", () => {
  it("Should be able to list School-Teacher", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const createSchoolRequest = mockISchoolRequest(
      createNetworkResponseBody.id
    );
    const schoolResponse = await createSchool(createSchoolRequest);

    const schoolTeacherQuantity = 3;
    for (let i = 0; i < schoolTeacherQuantity; i++) {
      const createTeacherRequest = mockITeacherRequest();
      const teacherResponse = await createTeacher(createTeacherRequest);
      await superAppRequest.post("/school-teacher").send({
        schoolId: schoolResponse.id,
        teacherId: teacherResponse.id
      });
    }
    const listSchoolTeacherResponseBody = await listSchoolTeacher({
      schoolId: schoolResponse.id
    });

    expect(listSchoolTeacherResponseBody?.length).toBe(schoolTeacherQuantity);
  });
});
