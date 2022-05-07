import { superAppRequest } from "../../setup";
import {
  createClass,
  createNetwork,
  createSchool,
  createTeacher,
  listSchoolTeacher,
  listTeacherClass
} from "../Helpers/Helper";
import {
  mockIClassRequest,
  mockINetworkRequest,
  mockISchoolRequest,
  mockITeacherRequest
} from "../Helpers/Mock";

describe("List TeacherClass Controller", () => {
  it("Should be able to list Teacher-Class", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const schoolRequest = mockISchoolRequest(createNetworkResponseBody.id);
    const createSchoolResponseBody = await createSchool(schoolRequest);

    const createClassRequest = mockIClassRequest(createSchoolResponseBody.id);
    const createClassResponseBody = await createClass(createClassRequest);

    const teacherClassQuantity = 3;
    for (let i = 0; i < teacherClassQuantity; i++) {
      const createTeacherRequest = mockITeacherRequest();
      const teacherResponse = await createTeacher(createTeacherRequest);
      await superAppRequest.post("/teacher-class").send({
        teacherId: teacherResponse.id,
        classId: createClassResponseBody.id
      });
    }
    const listTeacherClassResponseBody = await listTeacherClass({
      classId: createClassResponseBody.id
    });
    expect(listTeacherClassResponseBody.length).toBe(teacherClassQuantity);
  });
});
