import mongoose from "mongoose";
const mongo_uri = process.env.MONGO_URI;
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    // delete all users - Mongoose functions all return promises
    await Order.deleteMany(); // empty will delete everything
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Inserting users".yellow.inverse);
    const createdUsers = await User.insertMany(users);
    console.log("Users imported".green.inverse);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      console.log(product);
      return { ...product, user: adminUser };
    });
    /**
            {
                name: "iPhone 11 Pro 256GB Memory",
                image: "/images/phone.jpg",
                description:
                "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
                brand: "Apple",
                category: "Electronics",
                price: 599.99,
                countInStock: 7,
                rating: 4.0,
                numReviews: 8,
                user: adminUser
            },
             */
    // inserts products into the database

    console.log("Inserting Products".yellow.inverse);
    await Product.insertMany(sampleProducts);
    console.log("Products imported".green.inverse);
    console.log("Data import complete".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
// console.log(mongo_uri);
// console.log(typeof process.env.MONGO_URI); // string
// console.log(process.argv);
/* console.log(process.argv) OUTPUT
[
  '/Users/rainiersarmiento/.nvm/versions/node/v24.11.0/bin/node',
  '/Users/rainiersarmiento/Documents/Projects/proshop/backend/seeder',
  '-d',
  '-h'
]
  process.argv[2]; = -d
*/
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
