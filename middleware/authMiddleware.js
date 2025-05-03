import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
