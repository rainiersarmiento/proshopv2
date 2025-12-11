const port = process.env.PORT || 8000;
import express from "express";
import path from "node:path";
import products from "./data/products.js";
import url from "node:url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
connectDB();
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename);
// console.log(import.meta.filename);
// console.log(import.meta.dirname);
// console.log(__dirname);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
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
