import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export async function getAllUsers(req: Request, res: Response): Promise<any> {
    try {
        const users = await User.find({});
        return res.status(200).json({ success: true, users })
    } catch (error) {
        console.log("GET USERS ERROR:", error);
        return res.status(200).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getUserById(req: Request, res: Response): Promise<any> {
    const { id } = req.body;
    try {
        const user = await User.findById(id);
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("GET USER BY ID ERROR:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function createUser(req: Request, res: Response): Promise<any> {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ success: false, message: "Invalid payload" });

    try {
        if (password.length < 8)
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });

        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        if (!newUser)
            return res
                .status(400)
                .json({ success: false, message: "Invalid user data" });

        await newUser.save();

        return res.status(201).json({
            success: true,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            },
        });
    } catch (error) {
        console.log("CREATE USER ERROR:", error);
        return res
            .status(400)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function deleteUserById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
        const response = await User.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log("DELETE USER ERROR :", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}