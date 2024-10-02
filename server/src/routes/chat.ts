import { Router, Response } from "express";

import { sendChat, getConversations, getConversation, deleteConversation, deleteAllConversations } from "../controllers/chatController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/chat").post(fetchuser,(req: any, res: Response)=>sendChat(req, res));
    router.route("/api/chats").get(fetchuser, (req: any, res: Response)=>getConversations(req, res));
    router.route("/api/chat").get(fetchuser, (req: any, res: Response)=>getConversation(req, res));
    router.route("/api/chat").delete(fetchuser, (req: any, res: Response)=>deleteConversation(req, res));
    router.route("/api/chats").delete(fetchuser, (req: any, res: Response)=>deleteAllConversations(req, res));
}