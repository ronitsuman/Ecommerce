import express from "express";
import { addToCart, getCart } from "../controller/cart.controller.js";
import protect from "../middleware/authMiddleware.js";

export const router = express.Router();

router.post("/", protect, addToCart);  // ✅ Only authenticated users can add to cart
router.get("/", protect, getCart);  // ✅ Only authenticated users can see their cart
