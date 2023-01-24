const router = require("express").Router();
const {
  verifyToken,
  verifyAndAuthorize,
  verifyTokenAndAdmin,
} = require("../JWT/verify-token");
const userController = require("../controller/user");

//ROUTE
router.route("/:id").get(userController.getuser);
router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .put(verifyAndAuthorize, userController.updateUser)
  .delete(userController.deleteUser);

router.route("/stat").get(userController.getStat);

module.exports = router;
