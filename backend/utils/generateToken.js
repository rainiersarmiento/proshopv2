import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // Set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    // if in not in development -> True bc only works with https
    secure: process.env.NODE_ENV !== "development",
    // Secures from attacks
    SameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
