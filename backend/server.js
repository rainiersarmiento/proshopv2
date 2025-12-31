import cookieParser from "cookie-parser";
const port = process.env.PORT || 8000;
import express from "express";
import path from "path";
import products from "./data/products.js";
import url from "node:url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
connectDB();
const app = express();

// Body parser middleware
// Allows to get data from req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows the use of req.cookies
app.use(cookieParser()); // req.cookies.jwt

const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log(__filename);
// console.log(import.meta.filename);
// console.log(import.meta.dirname);
// console.log(__dirname);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// upload Route
app.use("/api/upload", uploadRoutes);
// REMAINS ON THE BACKEND BECAUSE
// WHY WOULD YOU WANT IT AVAILABLE IN THE FRONTEND
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// upload folder in root

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve(); // set __dirname to current directory
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*splat", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// app.get("/", (req, res) => {
//   // res.send("API is running...");
//   res.status(200).json({ msg: "Hello World " });
// });

// app.get("/api/products", (req, res) => {
//   res.status(200).json(products);
// });

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   console.log(product);
//   res.status(200).json(product);
// });

/**
 * GET
 * POST
 * PUT
 * DELETE
 */

app.listen(port, () => console.log(`Server running on port ${port}`));
