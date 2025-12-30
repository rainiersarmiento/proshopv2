import express from "express";
// import {} from "../controllers/productsControllers.js";
// import products from "../data/products.js";
const router = express.Router();
import Product from "../models/productModel.js";
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
