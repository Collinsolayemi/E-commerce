const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(402).json("Token invalid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("you are not authorize");
  }
};

const verifyAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("you are not allowed to do this");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("you are not allowed to do this");
    }
  });
};

module.exports = {
  verifyToken,
  verifyAndAuthorize,
  verifyTokenAndAdmin,
};
