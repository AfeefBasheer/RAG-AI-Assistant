import database from "./src/database/chroma.js";
import dotenv from "dotenv";
import embedderService from "./src/preprocessor/embedder/embedderService.js";
import textSplitterService from "./src/preprocessor/textSplitter/textSplitterService.js";
import express from "express";
import appRouter from "./src/router/appRouter.js";
import geminiService from "./src/chat/AI/geminiService.js";
import retrieverRouter from "./src/chat/retriever/retrieverRouter.js";

const app = express();
dotenv.config();

const overlap = 10;
const size = 50;

(async () => {
  await geminiService.createGemini();
  await database.createAndConnectToClient();
  await textSplitterService.createRecursiveCharacterTextSplitter(size, overlap);
  await embedderService.createEmbedder();
  console.log("✅ All services initialized.");
  console.log("Getting Services - ")
  await retrieverRouter.check();
})();

app.use("/", appRouter);

export default app;
