import "reflect-metadata";
import { AppDataSource } from "./data-source";
import "express-async-errors";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}!`)
    );
  })
  .catch((error) => console.log(error));
