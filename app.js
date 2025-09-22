import database from "./src/database/chroma.js";
import dotenv from "dotenv";
import express from "express";
import appRouter from "./src/router/appRouter.js";
const app = express();

(async () => {
  await database.createAndConnectToClient();
})();

dotenv.config();

app.use("/", appRouter);

export default app;
