import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (
  userId: mongoose.Types.ObjectId,
  res: Response
) => {
  const { JWT_SECRET, NODE_ENV } = process.env;
  if (!JWT_SECRET)
    return res
      .status(500)
      .json({ status: "error", message: "Jwt secret not found" });
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV !== "development",
  });

  return token;
};
