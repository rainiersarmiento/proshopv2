const port = process.env.PORT || 8000;
import express from "express";
import path from "node:path";
import products from "./data/products.js";

const app = express();

app.get("/", (req, res) => {
  // res.send("API is running...");
  res.status(200).json({ msg: "Hello World " });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  console.log(product);
  res.json(product);
});

console.log("Hello World");

app.listen(port, () => console.log(`Server running on port ${port}`));
