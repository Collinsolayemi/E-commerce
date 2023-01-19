const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.verifyToken;
  if (authHeaders) {
  } else {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err,
      (user) => {
        if (err)
          res.status(StatusCodes.NOT_ACCEPTABLE).json("Token is not valid");
        req.user = user;
        next();
      })
    );
  }
  return res
    .status(StatusCodes.NOT_ACCEPTABLE)
    .json("You are not authenticated!");
};
