import express from "express";
import chatService from "./chatService.js"
const Router = express.Router();


Router.post("/sendquery", async (req, res) => {
  let response = await chatService.handleUserQuery(req.body);
  console.log(response);
  res.send("chatRouter.js");
});

export default Router;
