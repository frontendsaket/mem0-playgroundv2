import { Router } from "express";
// import auth from "./auth";
import memory from "./memory";
import chat from "./chat";

const router = Router();

export default (): Router => {
//   auth(router);
  memory(router);
  chat(router);
  return router;
};