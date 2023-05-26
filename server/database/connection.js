const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb connection string
    mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb is connected`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
