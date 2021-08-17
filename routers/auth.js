const Joi = require("joi");
const validate = require("../middlewares/validate");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
require("express-async-errors");

validateReq = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
};

router.post("/", validate(validateReq), async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(400).send("Invalid user or password");

  const isValid = bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid user or password");

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
