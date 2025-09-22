import express from "express";
import ingestionService from "./ingestionService.js";
const Router = express.Router();

Router.post("/ingestioncollection", async (req, res) => {
  let response = await ingestionService.addIngestionCollection(req.body);
  if (!response) return res.status(500).send();
  else return res.status(202).send(response);
});

export default Router;
