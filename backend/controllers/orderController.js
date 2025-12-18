import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res, next) => {
  console.log("Router called add order items.");
  res.send("Add order items");
});

// @desc Get logged in user order
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res, next) => {
  console.log("Router called add order items.");
  res.send("get my orders");
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res, next) => {
  console.log("Router called getOrderById");
  res.send("get order by ID");
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  console.log("Router called updateOrderToPaid");
  res.send("update order to paid");
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  console.log("Router called updateOrderToPaid");
  res.send("update order to delivered");
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res, next) => {
  console.log("Router called getAllOrders");
  res.send("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
