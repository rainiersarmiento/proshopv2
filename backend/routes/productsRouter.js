import express from "express";
// import {} from "../controllers/productsControllers.js";
import products from "../data/products.js";
const router = express.Router();

/**
 * CREATE - POST
 * READ - GET
 * UPDATE - PUT
 * DELETE - DELETE
 */

// DESC :  GET ALL PRODUCTS
// ROUTE : '/api/products/
router.get("/", (req, res) => {
  console.log("Router called get products request.");
  res.json(products);
});

// DESC : GET A SINGLE PRODUCT
// ROUTE : '/api/products/:id'
router.get("/:id", (req, res) =>
  console.log(`GET request for product ${req.params.id} called.`)
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
