import express from "express";
import preprocessorService from "../preprocessor/preprocessorService.js";

const Router = express.Router();

let processedData = preprocessorService.preprocessData('afeef')

export default Router;
