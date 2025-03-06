import express from "express";
import authRouter from "./routes/auth.route";
import dotenv from "dotenv";
import { connectToDB } from "./lib/db";
import coookieParse from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
connectToDB();

app.use(express.json());
app.use(coookieParse());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
