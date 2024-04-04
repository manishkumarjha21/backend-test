const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors')
const userRouter=require('./routes/userRouter')
const cookieParser = require("cookie-parser");
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1",userRouter)
const PORT = process.env.PORT || 3000;
require("./config/connect").connect();
app.listen(PORT, () => {
  console.log(`Server stared at port no. ${PORT}`);
});
