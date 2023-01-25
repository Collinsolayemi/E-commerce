const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const cryptoJS = require("crypto-js");
const Cart = require("../model/cart");

//CREATE NEW CART
exports.createNewCart = async (req, res) => {
  const cart = Cart(req.body);

  try {
    const newCart = await cart.save();
    res.status(StatusCodes.OK).json(newCart);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//GET ALL CART
exports.getAllCart = async (req, res) => {
  const qNew = req.query.new;
  const qcategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qcategory) {
      products = await Product.find({
        categories: {
          $in: [qcategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(StatusCodes.OK).json({
      status: "success",
      product_nums: products.length,
      message: products,
    });
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//UPDATE CART
exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//DELETE CART
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.ACCEPTED).json("deleted successfully!");
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//GET ONE CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    return res.status(StatusCodes.OK).json(cart);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};
