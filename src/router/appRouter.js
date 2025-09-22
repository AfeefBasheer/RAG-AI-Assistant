import ingestionRouter from "../ingestion/ingestionRouter.js"
import express from "express";

const Router = express.Router();

Router.use("/", ingestionRouter);

export default Router;
