const router = require("express").Router();
const productController = require("../controller/product");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyAndAuthorize,
} = require("../JWT/verify-token");

router
  .route("/")
  .post(verifyTokenAndAdmin, productController.createNewProduct)
  .get(verifyAndAuthorize, productController.getAllProducts);
router
  .route("/:id")
  .put(verifyTokenAndAdmin, productController.updateProduct)
  .delete(verifyTokenAndAdmin, productController.deleteProduct)
  .get(verifyAndAuthorize, productController.getProduct);

module.exports = router;
