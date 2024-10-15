import express from "express";
import {
  getMyProfile,
  loginUser,
  Logout,
  registerUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, Logout);

export default router;
