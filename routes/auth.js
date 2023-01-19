const router = require("express").Router();
const userControl = require("../controller/user");
// const User = require("../model/user");

// router.post("/regiter", async (req, res) => {
//   const newUser = new User({
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//   });

//   try {
//     const savedUser = await newUser.save();
//     res.status(201).json({ savedUser });
//   } catch (err) {
//     console.log(err);
//   }
// });

router.route("/register").get(userControl.getUser).post(userControl.createUser);

module.exports = router;
