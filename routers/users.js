const { validateUser, User } = require("../models/user");
const validate = require("../middlewares/validate");
const express = require("express");
const router = express.Router();
require("express-async-errors");

router.post("/", validate(validateUser), async (req, res) => {
  //400
  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) return res.status(400).send("The user is already existed");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
});

module.exports = router;
