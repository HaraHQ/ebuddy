import { getUserByName, getUserList, saveUser } from "../repository/userCollection";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const fetchUserData = async (req: any, res: any) => {
  const { page, perPage } = req.query;
  const { users } = await getUserList();

  return res.json({
    users,
  });
}

export const updateUserData = async (req: any, res: any) => {
  const { username, password } = req.body;

  const payload = {
    u: username,
    p: await bcrypt.hash(password, 10),
  }

  await saveUser(payload);

  return res.json({
    username,
    message: "User upsert successfully",
  });
}

export const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  const payload = {
    u: username,
    p: await bcrypt.hash(password, 10),
    updatedAt: new Date().getTime(),
  }

  const p = await getUserByName(payload);
  if (p) {
    const isPasswordMatch = await bcrypt.compare(password, p);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  }

  return res.json({
    token: JWT.sign({ u: username }, JWT_SECRET),
  });
}