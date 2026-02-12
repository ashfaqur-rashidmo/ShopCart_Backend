// src/routes/productRoute.js
import express from 'express';
import { getProductsByCategorySlug, getProductBySlug, createProduct, getProducts, getHotProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get("/slug/:slug", getProductBySlug);

router.post('/add', createProduct);  

router.get("/category/:slug", getProductsByCategorySlug);

router.get("/hot", getHotProducts);

export default router;
