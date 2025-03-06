import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { DecodedToken } from "../lib/types";



export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.jwt;
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET)
      return res
        .status(500)
        .json({ status: "error", message: "Jwt secret not found" });
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("ERROR IN PROTECTED ROUTE MIDDLEWARE:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
