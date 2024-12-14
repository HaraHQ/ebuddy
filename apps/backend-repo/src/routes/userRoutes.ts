import { Router } from "express";
import { fetchUserData, login, updateUserData } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const r = Router();

r.get("/", (req, res) => {
  res.send("Hello World!");
});

r.get("/fetch-user-data", authMiddleware, fetchUserData);

r.put("/update-user-data", authMiddleware, updateUserData);

r.post("/login", login);

export default r