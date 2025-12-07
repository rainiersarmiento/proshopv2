import express from "express";
// import {} from "../controllers/productsControllers.js";
// import products from "../data/products.js";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
/**
 * CREATE - POST
 * READ - GET
 * UPDATE - PUT
 * DELETE - DELETE
 */

// DESC :  GET ALL PRODUCTS
// ROUTE : '/api/products/
router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("Router called get products request.");
    // use ____.find({}) to get all the objects
    // IMPORTANT: use {} to get ALL the objects
    const products = await Product.find({});
    res.json(products);
  })
);

// DESC : GET A SINGLE PRODUCT
// ROUTE : '/api/products/:id'
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    console.log(`GET request for product ${req.params.id} called.`);
    //const product = Product.find(p => p._id === req.params.id);
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    }
    res.status(404).json({ message: "Product not found" });
  })
);

// DESC :  CREATE A PRODUCTS
// ROUTE : '/api/products/
router.post("/", (req, res) =>
  console.log("POST request called to /api/products")
);

// DESC : ALTER A PRODUCT
// ROUTE : '/api/products/:id'
router.put("/:id", (req, res) =>
  console.log(`PUT request called to api/products/${req.params.id}`)
);

// DESC : DELETE A PRODUCT
// ROUTE : '/api/products/:id'
router.delete("/:id", (req, res) =>
  console.log(`DELETE request sent to \'/api/products/${req.params.id}\'`)
);

export default router;
