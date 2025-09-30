import ingestionRouter from "../ingestion/ingestionRouter.js"
import chatRouter from "../chat/userChat/chatRouter.js"
import express from "express";

const Router = express.Router();

Router.use("/", ingestionRouter);
Router.use("/",chatRouter)
export default Router;
