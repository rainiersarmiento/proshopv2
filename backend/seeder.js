import mongoose from "mongoose";
import uri from process.env.MONGO_URI
import colors from "colors";
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

connectDB();

const importData = async() => {
    try {
        // delete all users - Mongoose functions all return promises
        await Order.deleteMany(); // empty will delete everything
        await Product.deleteMany();
        await User.deleteMany();
        const createdUsers = await User.insertMany(users); 
    } catch (error) {
        
    }
}