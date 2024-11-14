import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IToken } from "../../api/auth/authModel";

const secret = process.env.JWT_SECRET!;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token is required" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret) as IToken;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
    return;
  }
};
