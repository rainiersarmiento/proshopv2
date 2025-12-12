import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc login user & get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(email, password);
  // finds 1 document in the database with the same email
  const user = await User.findOne({ email });
  // user.matchPassword - Do not need to import because it is already a part of the schema
  // this references the object that calls the function (user)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // Unauthorized
    res.status(401);
    // Can be security issue if told which was incorrect.
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// @route POST /api/users/login
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
  res.send("register user");
});

// @desc Logout user & clear HTTP cookie on server
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res, next) => {
  res.send("logout user");
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  res.send("Get user profile");
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  // No ID passed because it is a user's own profile being updated
  // Will be done using the token bc the user only has access to their token
  res.send("Update user");
});

// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
  res.send("get users");
});

// @desc GET user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res, next) => {
  res.send("Get user by ID");
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  res.send("Delete user");
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  res.send("update user");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
