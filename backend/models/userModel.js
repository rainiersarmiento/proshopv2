// Note the singular form in 'userModel.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Method to validate user's password
// Compares the passed plaintext (enteredPassword) with Mongoose function this
// to validate
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// pre is middleware to do actions before the document is saved to the
// database
userSchema.pre("save", async function (next) {
  // checks if one of the paths are modified, make sure to pass in the parameter to check
  if (!this.isModified("password")) {
    next();
  }
  // generate a salt using bcrypt
  const salt = await bcrypt.genSalt(10);
  // get the password field and set it to the hashed password
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
