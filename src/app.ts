import express from "express";
import "reflect-metadata";
import { router } from "./routes";
import "express-async-errors";
import { errorHandler } from "./middlewares/errorHandler";

export class NotFound extends Error {}
export class InvalidArgument extends Error {}

const app = express();

app.use(express.json());
app.use(router);

app.use(errorHandler);

export default app;
