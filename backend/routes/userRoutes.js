import express from "express";
const router = express.Router();
import User from "../models/userModel.js";

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
/**
 * CREATE - POST
 * READ - GET
 * UPDATE - PUT
 * DELETE - DELETE
 */

// Will need middleware to allow ONLY admin access
router.route("/").post(registerUser).get(getUsers);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;
