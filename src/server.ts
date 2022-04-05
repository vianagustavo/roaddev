import "reflect-metadata";
import { AppDataSource } from "./data-source";
import "express-async-errors";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    app.listen(4800, () => console.log("Server is running!"));
  })
  .catch((error) => console.log(error));
