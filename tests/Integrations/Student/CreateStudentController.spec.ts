import request from "supertest";
import app from "../../../src/app";
import { CreateNetworkService } from "../../../src/services/Network/CreateNetworkService";
import {
  CreateSchoolService,
  ISchoolRequest
} from "../../../src/services/School/CreateSchoolService";
import { IStudentRequest } from "../../../src/services/Student/CreateStudentService";

describe("Create School Controller", () => {
  it("Should be able to create a new student", async () => {
    const createNetworkService = new CreateNetworkService();
    const createSchoolService = new CreateSchoolService();
    const network = await createNetworkService.execute("TestNework");

    const schoolRequest: ISchoolRequest = {
      name: "Test Name",
      address: "Test Adress",
      id: network.id
    };
    const school = await createSchoolService.execute(schoolRequest);
    const student: IStudentRequest = {
      birthDate: "22 May 2015",
      schoolId: school.id,
      name: "Test Student",
      fatherName: "Test Father",
      motherName: "Test Mother",
      password: "Test"
    };

    const response = await request(app).post("/students").send(student);
    expect(response.status).toBe(200);
  });
});
