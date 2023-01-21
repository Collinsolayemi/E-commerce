const router = require("express").Router();
const {
  verifyToken,
  verufyAndAuthorize,
  verifyTokenAndAdmin,
} = require("../JWT/verify-token");
const userController = require("../controller/user");

router.route("/find/:id").get(userController.getuser);
router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .put(verufyAndAuthorize, userController.updateUser)
  .delete(userController.deleteUser);

//ADDING STats

module.exports = router;
