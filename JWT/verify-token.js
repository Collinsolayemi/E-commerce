const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");

//verify the token
const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;

  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (error,
      (user) => {
        if (error)
          res.status(StatusCodes.NOT_ACCEPTABLE).json("Token is not valid");
        req.user = user;
        next();
      })
    );
  } else {
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json("You are not authenticated!");
  }
};

//Authorize and verify token
const verifyAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json("You are not allow to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyAndAuthorization,
};
