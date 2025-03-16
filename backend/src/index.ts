import express, { Request, Response } from "express";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import dotenv from "dotenv";
import { connectToDB } from "./lib/db";
import coookieParse from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/utils/socket";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  });
}

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
