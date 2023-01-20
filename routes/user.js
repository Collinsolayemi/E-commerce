const router = require("express").Router();
const { verifyToken, verifyAndAuthorization } = require("../JWT/verify-token");
const cryptoJS = require("crypto-js");
const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const User = require("../model/user");

router.put("/:id", verifyAndAuthorization, async (req, res) => {
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

module.exports = router;
