import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { deleteMessageById, getAllMessages, getMessages, getUsers, sendMessage } from "../controllers/message.controller.js";

const router = Router()

/*
** Get users
*/
router.get("/users", protectedRoute, getUsers);

/*
** Get All Messages
*/
router.get("/", protectedRoute, getAllMessages);

/*
** Get message of sender or reciever user
*/
router.get("/:id", protectedRoute, getMessages);

/*
** Send message to a user
*/
router.post("/send/:id", protectedRoute, sendMessage)

/*
** Delete message
*/
router.delete("/:id", protectedRoute, deleteMessageById);

export default router;