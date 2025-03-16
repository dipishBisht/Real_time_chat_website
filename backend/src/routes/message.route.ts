import { Router } from "express";
import { protectedRoute } from "../middleware";
import { getMessages, getUsers, sendMessage } from "../controllers/";

const router = Router()

router.get("/users", protectedRoute, getUsers);

router.get("/:id", protectedRoute, getMessages);

router.post("/send/:id", protectedRoute, sendMessage)

export default router;