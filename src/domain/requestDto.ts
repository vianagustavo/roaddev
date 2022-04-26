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
