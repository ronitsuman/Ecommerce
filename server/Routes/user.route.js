import express from "express";
import { loginUser, registerUser ,getUserProfile} from "../controller/user.controller.js";
import protect from "../middlewares/authMiddleware.js";

export const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserProfile);  // ✅ Protect Route
