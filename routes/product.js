const router = require("express").Router();
const productController = require("../controller/product");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyAndAuthorize,
} = require("../JWT/verify-token");

router.route("/").post(verifyTokenAndAdmin, productController.createNewProduct);
router.route("/:id").put(verifyTokenAndAdmin, productController.updateProduct);

module.exports = router;
