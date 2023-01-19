const router = require("express").Router();
const userControl = require("../controller/user");

router.route("/register").post(userControl.createUser);
router.route("/login").post(userControl.logIn);

module.exports = router;
