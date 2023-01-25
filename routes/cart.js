const router = require("express").Router();
const {
  verifyToken,
  verifyAndAuthorize,
  verifyTokenAndAdmin,
} = require("../JWT/verify-token");
const cartControllers = require("../controller/cart");

router
  .route("/")
  .post(verifyToken, cartControllers.createNewCart)
  .get(verifyTokenAndAdmin, cartControllers.getAllCart);
router
  .route("/:id")
  .delete(verifyAndAuthorize, cartControllers.deleteCart)
  .put(verifyTokenAndAdmin, cartControllers.updateCart);
router
  .route("/find/:userId")
  .get(verifyAndAuthorize, cartControllers.createNewCart);

module.exports = router;
