import { superAppRequest } from "../../setup";
import {
  createClass,
  createNetwork,
  createSchool,
  createStudent,
  listStudentClass
} from "../Helpers/Helper";
import {
  mockIClassRequest,
  mockINetworkRequest,
  mockISchoolRequest,
  mockIStudentRequest
} from "../Helpers/Mock";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { successGetEnrollment, successLogin } from "../Helpers/AxiosMock";

describe("List StudentClass Controller", () => {
  it("Should be able to list Student-Class", async () => {
    const createNetworkRequest = mockINetworkRequest();
    const createNetworkResponseBody = await createNetwork(createNetworkRequest);

    const createSchoolRequest = mockISchoolRequest(
      createNetworkResponseBody.id
    );
    const createSchoolResponseBody = await createSchool(createSchoolRequest);

    const createStudentRequest = mockIStudentRequest(
      createSchoolResponseBody.id
    );
    const mock = new MockAdapter(axios);
    successLogin(mock);
    successGetEnrollment(mock, createStudentRequest.enrollment);
    const createStudentResponseBody = await createStudent(createStudentRequest);

    const studentClassQuantity = 3;
    for (let i = 0; i < studentClassQuantity; i++) {
      const createClassRequest = mockIClassRequest(createSchoolResponseBody.id);
      const createClassResponseBody = await createClass(createClassRequest);
      await superAppRequest.post("/student-class").send({
        studentId: createStudentResponseBody.id,
        classId: createClassResponseBody.id
      });
    }
    const listSchoolTeacherResponseBody = await listStudentClass({
      studentId: createStudentResponseBody.id
    });

    expect(listSchoolTeacherResponseBody.length).toBe(studentClassQuantity);
  });
});
