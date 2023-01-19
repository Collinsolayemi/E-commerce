const User = require("../model/user");
const cryptoJS = require("crypto-js");
const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const jwt = require("jsonwebtoken");

exports.getUser = (req, res) => {
  res.send("get user");
};

//REGISTRATION FUNCTIONALITY
exports.createUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(StatusCodes.OK).json({ savedUser });
  } catch (err) {
    console.log(err);
  }
};

//LOGIN FUNCTIONALITY
exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json("Wrong credencials");
    }

    //encrypt the password
    const hashPassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );

    const userPassord = hashPassword.toString(cryptoJS.enc.Utf8);
    if (userPassord !== req.body.password) {
      res.status(500).json("wrong credencial");
    }

    //jwt token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    //hide the password from the res
    const { password, ...others } = user._doc;

    return res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ err });
  }
};
