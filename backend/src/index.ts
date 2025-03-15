import express from "express";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import dotenv from "dotenv";
import { connectToDB } from "./lib/db";
import coookieParse from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
connectToDB();

app.use(express.json());
app.use(coookieParse());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
