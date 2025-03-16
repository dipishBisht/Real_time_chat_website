import express from "express";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import dotenv from "dotenv";
import { connectToDB } from "./lib/db";
import coookieParse from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/utils/socket";

dotenv.config();

const PORT = process.env.PORT;
connectToDB();

app.use(express.json({ limit: "10mb" }));
app.use(coookieParse());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));


app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
