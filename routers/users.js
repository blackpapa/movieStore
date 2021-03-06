const { validateUser, User } = require("../models/user");
const validate = require("../middlewares/validate");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
require("express-async-errors");

router.post("/", validate(validateUser), async (req, res) => {
  //400
  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) return res.status(400).send("The user is already existed");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["name", "email", "password"]));
});

module.exports = router;
