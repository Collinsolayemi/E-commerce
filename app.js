const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DB = process.env.DATABASE_URL;
mongoose
  .set("strictQuery", false)
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`backnd running on port ${port}`);
});
