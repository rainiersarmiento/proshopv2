import mongoose from "mongoose";
console.log(process.env.MONGO_URI);
// Any methods called from mongoose model or mongoose are going to be a promise
const connectDB = async () => {
  // async await + trycatch is the move
  try {
    // calling to connect with the db
    const connect = await mongoose.connect(process.env.MONGO_URI);
    // confirmation msg
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    // if error then exit the process.
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
