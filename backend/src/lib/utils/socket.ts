import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const userMap: any = {};

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

export function getRecieverSocketId(userId: any) {
    return userMap[userId];
}

io.on("connection", (socket) => {

    const userId: any = socket.handshake.query.userId;
    if (userId)
        userMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userMap));

    socket.on("disconnect", () => {

        delete userMap[userId];
        io.emit("getOnlineUsers", Object.keys(userMap));
    })
});

export { io, app, server };