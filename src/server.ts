import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database";

const app = express();
AppDataSource.initialize()
    .then(() => {
      app.listen(4800, () => console.log("Server is running!"));
    })
    .catch((error) => console.log(error))





