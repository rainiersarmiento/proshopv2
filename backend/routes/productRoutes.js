import express from "express";
// import {} from "../controllers/productsControllers.js";
// import products from "../data/products.js";
const router = express.Router();
import Product from "../models/productModel.js";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";
/**
 * CREATE - POST
 * READ - GET
 * UPDATE - PUT
 * DELETE - DELETE
 */

// @DESC    :  GET ALL PRODUCTS
// @ROUTE   : '/api/products/
// @ACCESS  : Public
router.route("/").get(getProducts).post(protect, admin, createProduct);

// DESC : GET A SINGLE PRODUCT
// ROUTE : '/api/products/:id'
// @ACCESS  : Public
router.route("/:id").get(getProductById);

// DESC :  CREATE A PRODUCTS
// ROUTE : '/api/products/
// ACCESS : Public
router.route("/").post((req, res) => {
  console.log("POST request called to /api/products");
});

// DESC : ALTER A PRODUCT
// ROUTE : '/api/products/:id'
// ACCESS : Public
router.put("/:id", (req, res) =>
  console.log(`PUT request called to api/products/${req.params.id}`)
);

// DESC : DELETE A PRODUCT
// ROUTE : '/api/products/:id'
// ACCESS : Public
router.delete("/:id", (req, res) =>
  console.log(`DELETE request sent to \'/api/products/${req.params.id}\'`)
);

export default router;
