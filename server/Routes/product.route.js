import express from "express";
import { createProduct, getProducts } from "../controller/product.controller.js";
import protect from "../middlewares/authMiddleware.js";

export const router = express.Router();

router.post("/", protect, createProduct); // ✅ Only authenticated users can create products
router.get("/", getProducts);  // ✅ Anyone can view products

