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
