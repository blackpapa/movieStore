const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 50, required: true },
  email: { type: String, minLength: 5, maxLength: 50, required: true },
  password: { type: String, minLength: 5, maxLength: 1024, required: true },
});

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.email().min(5).max(50).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
