import { Router, Response } from "express";

import { getMemory, addMemory, updateMemory, deleteMemory, searchMemory } from "../controllers/memoryController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/memory").get(fetchuser, (req: any, res: Response)=>getMemory(req, res));
    router.route("/api/memory").delete(fetchuser,(req: any, res: Response)=>deleteMemory(req, res));
    router.route("/api/memory").put(fetchuser,(req: any, res: Response)=>updateMemory(req, res));
    router.route("/api/memory/add").post(fetchuser,(req: any, res: Response)=>addMemory(req, res));
    router.route("/api/memory/search").post((req: any, res: Response)=>searchMemory(req, res));
}