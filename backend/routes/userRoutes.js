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

/**
 * route to api/users/id and can be chained like an if statement
 * if delete request, call delete
 * if get, call getUserById
 * if put request then get updateUser
 */
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

// Why .post and not route? Its only a post request to logout, not a get or post so no need for router
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
