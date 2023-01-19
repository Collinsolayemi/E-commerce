const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB = require("./DB/connect-database");
const userRoute = require("./routes/userRoute");

//middleware
app.use(express.json());
app.use("/api/user", userRoute);

//starting the server
const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  return DB;
});
