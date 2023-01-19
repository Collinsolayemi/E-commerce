const { mongoose } = require("mongoose");

const CartModel = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartModel);
