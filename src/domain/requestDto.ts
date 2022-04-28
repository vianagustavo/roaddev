import { Request } from "express";

export interface IStudentDbFilter {
  networkId?: string;
  schoolId?: string;
}

export interface ISchoolDbFilter {
  networkId?: string;
}

export interface IStudentClassFilter {
  studentId?: string;
  classId?: string;
}

export interface ISchoolTeacherFilter {
  schoolId?: string;
  teacherId?: string;
}

export interface ITeacherClassFilter {
  teacherId?: string;
  classId?: string;
}

export enum WeekDays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

export interface IUserIdWithRequest extends Request {
  user_id: string;
}

export interface IStudentIdWithRequest extends Request {
  student_id: string;
}

export interface ICreateUserResponse {
  id: string;
  name: string;
  login: string;
  password: string;
  admin: string;
  created_at: string;
  updated_at: string;
}

export interface IAuthenticateUserRequest {
  login: string;
  password: string;
}

export interface IAuthenticateUserResponse {
  token: string;
}

export interface IUserRequest {
  name: string;
  login: string;
  password: string;
  admin?: boolean;
}
