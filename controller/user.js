const User = require("../model/user");
const statusCode = require("http-status-codes");
const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const cryptoJS = require("crypto-js");

exports.getUser = (req, res) => {
  res.send("get user");
};

exports.createUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ),
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(StatusCodes.OK).json({ savedUser });
  } catch (err) {
    console.log(err);
  }
};
