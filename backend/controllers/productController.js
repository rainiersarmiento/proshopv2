import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res, next) => {
  console.log("Router called get products request.");
  // use ____.find({}) to get all the objects
  // IMPORTANT: use {} to get ALL the objects
  const products = await Product.find({});
  //throw new Error("Some error");
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  // console.log(`GET request for product ${req.params.id} called.`);
  //const product = Product.find(p => p._id === req.params.id);
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    // This new Error uses the errorMiddleware function that we use.
    throw new Error("Resource not found");
  }
});

// @desc Create a product
// @route POST /api/products
// @access Private/admin

const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };
