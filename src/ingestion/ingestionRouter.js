import express from "express";
import preprocessorService from "../preprocessor/preprocessorService.js";

const Router = express.Router();

preprocessorService.preprocessData('afeef',10,5)

export default Router;
