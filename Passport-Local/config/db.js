const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

// const url = process.env.DB_URL;

const dbConnect = (url) => {
  return mongoose.connect(url);
};

module.exports = dbConnect;
