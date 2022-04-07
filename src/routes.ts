import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateNetworkController } from "./controllers/CreateNetworkController";
import { CreateSchoolController } from "./controllers/CreateSchoolController";
import { CreateStudentController } from "./controllers/CreateStudentController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListSchoolController } from "./controllers/ListSchoolController";
import { ListStudentController } from "./controllers/ListStudentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createNetworkController = new CreateNetworkController();
const schoolController = new CreateSchoolController();
const studentController = new CreateStudentController();
const listStudentController = new ListStudentController();
const listSchoolController = new ListSchoolController();

router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listStudentController.handle);
router.post("/login", authenticateUserController.handle);
router.get("/login", ensureAuthenticated);
router.post("/networks", createNetworkController.handle);
router.post("/schools", schoolController.handle);
router.post("/students", studentController.handle);
router.get("/schools", ensureAuthenticated, listSchoolController.handle);

export { router };
