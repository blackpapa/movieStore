const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 255, required: true },
  phone: { type: String, minLength: 2, maxLength: 20, required: true },
  isGold: { type: Boolean, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    phone: Joi.string().min(2).max(20).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
};

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
