const router = require("express").Router();
const verifyToken = require("../JWT/verify-token");

router.route("/:id").put();

module.exports = router;
