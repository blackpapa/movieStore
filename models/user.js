const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 50, required: true },
  email: { type: String, minLength: 5, maxLength: 50, required: true },
  password: { type: String, minLength: 5, maxLength: 1024, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(50).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
