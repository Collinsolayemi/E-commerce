const router = require("express").Router();
const {
  verifyToken,
  verufyAndAuthorize,
  verifyTokenAndAdmin,
} = require("../JWT/verify-token");
const cryptoJS = require("crypto-js");
const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const User = require("../model/user");

//update the user
router.put("/:id", verufyAndAuthorize, async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json();
  }
});

//DELETE THE USER
router.delete("/:id", verufyAndAuthorize, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.ACCEPTED).json("deleted successfully!");
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
});

//GET THE USER
router.get("/find/:id", async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    const { password, ...user } = getUser._doc;
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
});

//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const getAllUser = await User.find();
    const { password, ...others } = getAllUser;
    console.log(getAllUser, password);
    return res.status(StatusCodes.OK).json(getAllUser);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
});

module.exports = router;
