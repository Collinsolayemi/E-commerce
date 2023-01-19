const User = require("../model/user");

exports.getUser = (req, res) => {
  res.send("get user");
};

exports.createUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ savedUser });
  } catch (err) {
    console.log(err);
  }
};
