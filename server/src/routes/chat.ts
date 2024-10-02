import { Router, Response } from "express";

import { sendChat, getConversations, getConversation } from "../controllers/chatController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/chat").post(fetchuser,(req: any, res: Response)=>sendChat(req, res));
    router.route("/api/chats").get(fetchuser, (req: any, res: Response)=>getConversations(req, res));
    router.route("/api/chat").get(fetchuser, (req: any, res: Response)=>getConversation(req, res));
}