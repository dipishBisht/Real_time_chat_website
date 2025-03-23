import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { Request, Response, Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { createUser, deleteUserById, getAllUsers, getUserById } from "../controllers/user.controller.js";

const router = Router();

/*
** Get all user
*/
router.get("/", getAllUsers);

/*
** Get user by id
*/
router.get("/:id", getUserById);

/*
** Create user
*/
router.post("/", protectedRoute, createUser);

/*
** Delete user
*/
router.delete("/:id", protectedRoute, deleteUserById);

export default router;