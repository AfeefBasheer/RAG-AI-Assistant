import database from "./src/database/chroma.js";
import dotenv from "dotenv";
import express from "express";
import appRouter from "./src/router/appRouter.js";
import geminiService from "./src/chat/AI/geminiService.js"

const app = express();
dotenv.config();
app.use(express.json())
database.createAndConnectToClient();
geminiService.createGemini()

app.use("/", appRouter);

export default app;
