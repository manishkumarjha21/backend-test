const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
  mongoose
    .connect(process.env.BACKEND_URL)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err)
      console.error("failed to connect database");
      process.exit(1);
    });
};
