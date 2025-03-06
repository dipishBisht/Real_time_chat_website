import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export interface DecodedToken extends jwt.JwtPayload {
  userId: string;
}
