const router = require("express").Router();
const userControl = require("../controller/auth");

router.route("/register").post(userControl.createUser);
router.route("/login").post(userControl.logIn);

module.exports = router;
