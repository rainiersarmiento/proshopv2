import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc login user & get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // finds 1 document in the database with the same email
  const user = await User.findOne({ email });
  // user.matchPassword - Do not need to import because it is already a part of the schema
  // this references the object that calls the function (user)
  if (user && (await user.matchPassword(password))) {
    // Sending the object with the payload
    // Send in the secret
    // Send in expiration of the JWT token
    generateToken(res, user._id);

    res.status(200).json({
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
  // res.send("register user");
  const { name, email, password } = req.body;
  // findOne is a mongoose function
  // Does the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // create is a mongoose function
  // Create a user gathered from the create method from Mongoose
  const user = await User.create({
    name,
    email,
    password,
  });

  // Check if user was created
  if (user) {
    // Helper function to create a token so that the user can be logged in
    // after registration (/utils)
    generateToken(res, user._id);
    res.status(201).json({
      // if user then return the parameters in json
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    // If user was not created, throw a new error
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user & clear HTTP cookie on server
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res, next) => {
  // res.send("logout user");
  // res.cookie('which cookie', set cookie to, {options to set})
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  //res.send("Get user profile");
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // No ID passed because it is a user's own profile being updated
  // Will be done using the token bc the user only has access to their token
  // res.send("Update user");
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      // It's a hashed password so we want to only update it if it's in the body
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
