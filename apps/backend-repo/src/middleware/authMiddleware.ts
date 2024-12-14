import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const authMiddleware = (req: any, res: any, next: any) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (JWT.verify(token, JWT_SECRET)) {
    return next();
  }

  return res.status(500).json({ message: "System Error" });
};
