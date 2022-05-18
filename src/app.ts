import express from "express";
import "reflect-metadata";
import { router } from "./routes";
import "express-async-errors";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

export class NotFound extends Error {}
export class InvalidArgument extends Error {}
export class InternalServerError extends Error {}

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

export default app;
