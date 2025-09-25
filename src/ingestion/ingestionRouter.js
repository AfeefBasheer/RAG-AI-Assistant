import express from "express";
import ingestionService from "../preprocessor/preprocessorService.js";

const Router = express.Router();

Router.post("/getdata", async (req, res) => {
  let response = await ingestionService.ingestData(req.body);
  console.log(response);
});

export default Router;
