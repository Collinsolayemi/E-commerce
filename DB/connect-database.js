const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//database connection
const DB = process.env.DATABASE_URL;
mongoose
  .set("strictQuery", false)
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

module.exports = DB;
