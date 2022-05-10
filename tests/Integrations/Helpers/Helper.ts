import {
  IAuthenticateStudentRequest,
  IAuthenticateUserRequest,
  IAuthenticateUserResponse,
  IClassRequest,
  ICreateClassResponse,
  ICreateNetworkResponse,
  ICreateSchoolResponse,
  ICreateStudentResponse,
  ICreateTeacherResponse,
  ICreateUserResponse,
  INetworkRequest,
  ISchoolDbFilter,
  ISchoolRequest,
  ISchoolTeacherFilter,
  IStudentClassFilter,
  IStudentRequest,
  ITeacherClassFilter,
  ITeacherRequest,
  IUserRequest
} from "../../../src/domain/requestDto";
import { superAppRequest } from "../../setup";

export async function createUser(body: IUserRequest) {
  const createUserResponse = await superAppRequest.post("/users").send(body);
  const createUserResponseBody = createUserResponse.body as ICreateUserResponse;
  return createUserResponseBody;
}

export async function createNetwork(body: INetworkRequest) {
  const createNetworkResponse = await superAppRequest
    .post("/networks")
    .send(body);
  const createNetworkResponseBody =
    createNetworkResponse.body as ICreateNetworkResponse;
  return createNetworkResponseBody;
}

export async function createSchool(body: ISchoolRequest) {
  const createSchoolResponse = await superAppRequest
    .post("/schools")
    .send(body);
  const createSchoolResponseBody =
    createSchoolResponse.body as ICreateSchoolResponse;
  return createSchoolResponseBody;
}

export async function createStudent(body: IStudentRequest) {
  const createStudentResponse = await superAppRequest
    .post("/students")
    .send(body);
  const createStudentResponseBody =
    createStudentResponse.body as ICreateStudentResponse;
  return createStudentResponseBody;
}

export async function createClass(body: IClassRequest) {
  const createClassResponse = await superAppRequest.post("/classes").send(body);
  const createClassResponseBody =
    createClassResponse.body as ICreateClassResponse;
  return createClassResponseBody;
}

export async function createTeacher(body: ITeacherRequest) {
  const createTeacherResponse = await superAppRequest
    .post("/teachers")
    .send(body);
  const createTeacherResponseBody =
    createTeacherResponse.body as ICreateTeacherResponse;
  return createTeacherResponseBody;
}

export async function authenticateUser(body: IAuthenticateUserRequest) {
  const authenticateUserResponse = await superAppRequest
    .post("/login/admin")
    .send(body);
  const authenticateResponseBody =
    authenticateUserResponse.body as IAuthenticateUserResponse;
  return authenticateResponseBody;
}

export async function authenticateStudent(body: IAuthenticateStudentRequest) {
  const authenticateStudentResponse = await superAppRequest
    .post("/login/student")
    .send(body);
  const authenticateResponseBody =
    authenticateStudentResponse.body as IAuthenticateUserResponse;
  return authenticateResponseBody;
}

export async function listSchools(
  token: IAuthenticateUserResponse,
  filter?: ISchoolDbFilter
) {
  let filters: string | null = null;
  if (filter && filter.networkId) {
    filters = `?networkId=${filter.networkId}`;
  }
  const listSchoolResponse = await superAppRequest
    .get(`/schools${filters}`)
    .set("Authorization", `Bearer ${token.token}`);
  const listSchoolResponseBody =
    listSchoolResponse.body as ICreateSchoolResponse[];

  return listSchoolResponseBody;
}

export async function listSchoolTeacher(filter?: ISchoolTeacherFilter) {
  let filters: string | null = null;
  if (filter.schoolId) {
    filters = `?schoolId=${filter.schoolId}`;
    const listSchoolTeacherResponse = await superAppRequest.get(
      `/school-teacher${filters}`
    );
    const listSchoolTeacherResponseBody =
      listSchoolTeacherResponse.body as ICreateTeacherResponse[];

    return listSchoolTeacherResponseBody;
  } else if (filter.teacherId) {
    filters = `?teacherId=${filter.teacherId}`;
    const listSchoolTeacherResponse = await superAppRequest.get(
      `/school-teacher${filters}`
    );
    const listSchoolTeacherResponseBody =
      listSchoolTeacherResponse.body as ICreateSchoolResponse[];

    return listSchoolTeacherResponseBody;
  }
}

export async function listStudentClass(filter?: IStudentClassFilter) {
  let filters: string | null = null;
  if (filter.studentId) {
    filters = `?studentId=${filter.studentId}`;
    const listStudentClassResponse = await superAppRequest.get(
      `/student-class${filters}`
    );
    const listStudentClassResponseBody =
      listStudentClassResponse.body as ICreateClassResponse[];

    return listStudentClassResponseBody;
  } else if (filter.classId) {
    filters = `?classId=${filter.classId}`;
    const listStudentClassResponse = await superAppRequest.get(
      `/student-class${filters}`
    );
    const listStudentClassResponseBody =
      listStudentClassResponse.body as ICreateStudentResponse[];

    return listStudentClassResponseBody;
  }
}

export async function listTeacherClass(filter?: ITeacherClassFilter) {
  let filters: string | null = null;
  if (filter.classId) {
    filters = `?classId=${filter.classId}`;
    const listTeacherClassResponse = await superAppRequest.get(
      `/teacher-class${filters}`
    );
    const listTeacherClassResponseBody =
      listTeacherClassResponse.body as ICreateTeacherResponse[];

    return listTeacherClassResponseBody;
  } else if (filter.teacherId) {
    filters = `?teacherId=${filter.teacherId}`;
    const listTeacherClassResponse = await superAppRequest.get(
      `/teacher-class${filters}`
    );
    const listTeacherClassResponseBody =
      listTeacherClassResponse.body as ICreateClassResponse[];

    return listTeacherClassResponseBody;
  }
}

export function getMockedJwt() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjUxODU4NzY2LCJleHAiOjE2NTE4NTkzNjYsInN1YiI6IjdiYjg3MjEwLTU4YWEtNGFhNS1hNGM1LTMzNjg0ODQzYWExYyJ9.FqQPTcGJNNdgQqTBA809NUJD6fWzfa0utW9DebbAg3E";
}
