const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customerId: { type: String, minLength: 2, maxLength: 255, required: true },
  movieId: { type: String, minLength: 2, maxLength: 255, required: true },
});

const Rental = mongoose.model("Rental", rentalSchema);

const validateRental = (rental) => {
  const schema = Joi.object({
    customerId: Joi.objectId().min(2).max(255).required(),
    movieId: Joi.objectId().min(2).max(255).required(),
  });

  return schema.validate(rental);
};

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
