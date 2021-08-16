const { validateUser, User } = require("../models/user");
const validate = require("../middlewares/validate");
const express = require("express");
const router = express.Router();
require("express-async-errors");

router.post("/", validate(validateUser), async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
});

module.exports = router;
