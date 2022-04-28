import faker from "@faker-js/faker";
import {
  IClassRequest,
  INetworkRequest,
  ISchoolRequest,
  IStudentRequest,
  ITeacherRequest,
  IUserRequest
} from "../../../src/domain/requestDto";

export function mockIUserRequest() {
  const userData: IUserRequest = {
    name: faker.name.findName(),
    login: faker.internet.userName(),
    password: "admin",
    admin: false
  };

  return userData;
}

export function mockINetworkRequest() {
  const networkData: INetworkRequest = {
    name: faker.name.findName()
  };

  return networkData;
}

export function mockITeacherRequest() {
  const teacherData: ITeacherRequest = {
    name: faker.name.findName()
  };
  return teacherData;
}

export function mockISchoolRequest(networkId: string) {
  const schoolData: ISchoolRequest = {
    name: faker.internet.userName(),
    address: faker.address.streetAddress(),
    networkId
  };
  return schoolData;
}

export function mockIStudentRequest(schoolId: string) {
  const studentData: IStudentRequest = {
    birthDate: faker.date.past(10, "2017-01-01T00:00:00.000Z"),
    schoolId,
    name: faker.name.findName(),
    fatherName: faker.name.findName(),
    motherName: faker.name.findName(),
    password: faker.random.words()
  };
  return studentData;
}

export function mockIClassRequest(schoolId: string) {
  const classData: IClassRequest = {
    schoolId,
    name: faker.internet.userName(),
    classDay: 4,
    classStart: "13",
    classEnd: "15"
  };
  return classData;
}
