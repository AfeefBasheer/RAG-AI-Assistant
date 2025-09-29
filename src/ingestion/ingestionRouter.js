import express from "express";
import ingestionService from "./ingestionService.js";

const Router = express.Router();

let data =
  "Mars is known as the Red Planet and It has this this this this this this thin atmosphere and is home to the tallest volcano in the solar system.";

Router.post("/senddata", async (req, res) => {
  let response = await ingestionService.ingestData(data);
  console.log(response);
  res.send("here");
});

export default Router;
