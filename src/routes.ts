import { Response, Router } from "express";
import { AuthenticateUserController } from "./controllers/User/AuthenticateUserController";
import { CreateNetworkController } from "./controllers/Network/CreateNetworkController";
import { CreateSchoolController } from "./controllers/School/CreateSchoolController";
import { CreateStudentController } from "./controllers/Student/CreateStudentController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { ListSchoolController } from "./controllers/School/ListSchoolController";
import { ListStudentController } from "./controllers/Student/ListStudentController";
import { UpdateUserController } from "./controllers/User/UpdateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateStudentController } from "./controllers/Student/AuthenticateStudentController";
import { ensureStudentAuthenticated } from "./middlewares/ensureStudentAuthenticated";
import { UpdateStudentController } from "./controllers/Student/UpdateStudentController";
import { CreateClassesController } from "./controllers/Classes/CreateClassesController";
import { CreateTeacherController } from "./controllers/Teacher/CreateTeacherController";
import { AddStudentClassController } from "./controllers/StudentClass/AddStudentClassController";
import { ListStudentClassController } from "./controllers/StudentClass/ListStudentClassController";
import { AddSchoolTeacherController } from "./controllers/SchoolTeacher/AddSchoolTeachersController";
import { ListSchoolTeacherController } from "./controllers/SchoolTeacher/ListSchoolTeacherController";
import { AddTeacherClassController } from "./controllers/TeacherClass/AddTeacherClassController";
import { ListTeacherClassController } from "./controllers/TeacherClass/ListTeacherClassController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createNetworkController = new CreateNetworkController();
const schoolController = new CreateSchoolController();
const studentController = new CreateStudentController();
const listStudentController = new ListStudentController();
const listSchoolController = new ListSchoolController();
const updateUserController = new UpdateUserController();
const authenticateStudentController = new AuthenticateStudentController();
const updateStudentController = new UpdateStudentController();
const createClassesController = new CreateClassesController();
const createTeacherController = new CreateTeacherController();
const addStudentClassController = new AddStudentClassController();
const listStudentClassController = new ListStudentClassController();
const addSchoolTeacherController = new AddSchoolTeacherController();
const listSchoolTeacherController = new ListSchoolTeacherController();
const addTeacherClassController = new AddTeacherClassController();
const listTeacherClassController = new ListTeacherClassController();

router.get("/", (_, response: Response) => {
  return response.json({
    ok: true
  });
});

router.post("/users", createUserController.handle);
router.put("/users", ensureAuthenticated, updateUserController.handle);
router.post("/login/admin", authenticateUserController.handle);
router.post("/networks", createNetworkController.handle);
router.post("/schools", schoolController.handle);
router.get("/schools", listSchoolController.handle);
router.post("/students", studentController.handle);
router.post("/login/student", authenticateStudentController.handle);
router.get("/students", listStudentController.handle);
router.put(
  "/students",
  ensureStudentAuthenticated,
  updateStudentController.handle
);
router.post("/classes", createClassesController.handle);
router.post("/teachers", createTeacherController.handle);
router.post("/student-class", addStudentClassController.handle);
router.get("/student-class", listStudentClassController.handle);
router.post("/school-teacher", addSchoolTeacherController.handle);
router.get("/school-teacher", listSchoolTeacherController.handle);
router.post("/teacher-class", addTeacherClassController.handle);
router.get("/teacher-class", listTeacherClassController.handle);

export { router };
