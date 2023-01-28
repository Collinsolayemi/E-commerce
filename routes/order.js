const router = require("express").Router();
const orderControllers = require("../controller/order");
const {
  verifyAndAuthorize,
  verifyTokenAndAdmin,
} = require("../JWT/verify-token");

router
  .route("/")
  .get(verifyTokenAndAdmin, orderControllers.getAllOrder)
  .post(orderControllers.createNewOrder);

router
  .route("/:id")
  .get(verifyAndAuthorize, orderControllers.getOrder)
  .put(verifyTokenAndAdmin, orderControllers.updateOrder)
  .delete(verifyTokenAndAdmin, orderControllers.deleteOrder);

router.route("/income").get(verifyTokenAndAdmin, orderControllers.getStats);

module.exports = router;
