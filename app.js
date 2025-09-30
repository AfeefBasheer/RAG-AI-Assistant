import database from "./src/database/chroma.js";
import dotenv from "dotenv";
import express from "express";
import appRouter from "./src/router/appRouter.js";
import { json } from "stream/consumers";

const app = express();
dotenv.config();
app.use(express.json())
database.createAndConnectToClient();

app.use("/", appRouter);

export default app;
