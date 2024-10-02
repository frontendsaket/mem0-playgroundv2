import { Router, Response } from "express";

import { sendChat, getConversations, getConversation } from "../controllers/chatController";

export default (router: Router) => {
    router.route("/api/chat").post((req: any, res: Response)=>sendChat(req, res));
    router.route("/api/chats").get((req: any, res: Response)=>getConversations(req, res));
    router.route("/api/chat").get((req: any, res: Response)=>getConversation(req, res));
}