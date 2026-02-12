// src/routes/categoryRoute.js
import express from "express";
import { createCategory, getCategories, getProductsByCategoriesSlug } from "../controllers/categoryController.js";

const router = express.Router();

// GET ALL CATEGORIES
router.get("/", getCategories);

// GET SINGLE CATEGORY BY SLUG
router.get("/:slug", getProductsByCategoriesSlug);

// CREATE CATEGORY
router.post("/add", createCategory); // POST /api/categories



export default router;
