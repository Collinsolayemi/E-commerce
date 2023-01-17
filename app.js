const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = 1000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

const start = () => {
  const port = process.env.PORT || 1000;
  console.log(`APP running on port ${port}`);
};

start();
