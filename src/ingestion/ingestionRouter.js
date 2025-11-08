import express from "express";
import ingestionService from "./ingestionService.js";

const Router = express.Router();


Router.post("/senddata", async (req, res) => {
  let response = await ingestionService.ingestData(req.body.filePath,req.body.collectionName);
  console.log(response);
  res.send("here");
});

Router.delete("/deletecollection",async (req,res)=>{
    let response = await ingestionService.deleteIngestionCollection();
  console.log(response);
  res.send("here");
})
export default Router;
