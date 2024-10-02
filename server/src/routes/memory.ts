import { Router, Response } from "express";

import { getMemory, addMemory, updateMemory, deleteMemory } from "../controllers/memoryController";

export default (router: Router) => {
    router.route("/api/memory").get((req: any, res: Response)=>getMemory(req, res));
    router.route("/api/memory").delete((req: any, res: Response)=>deleteMemory(req, res));
    router.route("/api/memory").put((req: any, res: Response)=>updateMemory(req, res));
    router.route("/api/memory/add").post((req: any, res: Response)=>addMemory(req, res));
}