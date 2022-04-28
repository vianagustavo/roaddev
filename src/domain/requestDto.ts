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

export interface INetworkRequest {
  name: string;
}

export interface ISchoolRequest {
  networkId: string;
  name: string;
  address: string;
}

export interface ICreateNetworkResponse {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateSchoolResponse {
  id: string;
  name: string;
  address: string;
  networkId: string;
  created_at: string;
  updated_at: string;
}

export interface IStudentRequest {
  schoolId: string;
  name: string;
  birthDate: Date;
  fatherName: string;
  motherName: string;
  password: string;
}

export interface ICreateStudentResponse {
  id: string;
  schoolId: string;
  name: string;
  birthDate: Date;
  fatherName: string;
  motherName: string;
  enrollment: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface ITeacherRequest {
  name: string;
}

export interface IClassRequest {
  name: string;
  schoolId: string;
  classDay: WeekDays;
  classStart: string;
  classEnd: string;
}

export interface ICreateClassResponse {
  id: string;
  name: string;
  schoolId: string;
  classDay: WeekDays;
  classStart: string;
  classEnd: string;
  created_at: string;
  updated_at: string;
}

export interface IAuthenticateStudentRequest {
  enrollment: string;
  password: string;
}
