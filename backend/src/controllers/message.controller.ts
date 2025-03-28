import { Request, Response } from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/utils/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/utils/socket.js";

export async function getUsers(req: Request, res: Response): Promise<any> {
    try {
        const loggedInUser = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        return res.status(200).json({ success: true, users: allUsers })
    } catch (error) {
        console.log("GET USERS ERROR :", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getAllMessages(req: Request, res: Response): Promise<any> {
    try {
        const messages = await Message.find({});
        return res.status(200).json({ success: false, messages });
    } catch (error) {
        console.log("GET ALL MESSAGES ERROR :", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMessages(req: Request, res: Response): Promise<any> {
    try {
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId, recieverId: recieverId },
                { senderId: recieverId, recieverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json({ success: true, messages });
    } catch (error) {
        console.log("GET MESSAGES ERROR :", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export async function sendMessage(req: Request, res: Response): Promise<any> {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId)
            io.to(recieverSocketId).emit("newMessage", newMessage);

        return res.status(200).json({ success: true, message: newMessage })
    } catch (error) {
        console.log("SEND MESSAGE ERROR :", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
} 

export async function deleteMessageById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
        const response = await Message.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
        console.log("DELETE MESSAGE ERROR :", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}