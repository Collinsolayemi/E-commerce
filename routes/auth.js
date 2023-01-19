const router = require("express").Router();
const userControl = require("../controller/user");

router.route("/register").get(userControl.getUser).post(userControl.createUser);

module.exports = router;
