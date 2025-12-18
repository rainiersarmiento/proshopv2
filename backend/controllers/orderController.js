import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res, next) => {
  console.log("Router called get products request.");
  // use ____.find({}) to get all the objects
  // IMPORTANT: use {} to get ALL the objects
  const products = await Product.find({});
  //throw new Error("Some error");
  res.json(products);
});
