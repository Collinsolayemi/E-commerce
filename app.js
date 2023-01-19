const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB = require("./DB/connect-database");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

//middleware
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
//starting the server
const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  return DB;
});
