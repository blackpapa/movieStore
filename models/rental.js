const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, minLength: 2, maxLength: 255, required: true },
      phone: { type: String, minLength: 2, maxLength: 20, required: true },
      isGold: { type: Boolean, default: false },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        minLength: 2,
        maxLength: 255,
        required: true,
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
      },
    }),
    required: true,
  },
  dateOut: { type: Date, default: Date.now() },
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
