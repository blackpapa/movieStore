const mongoose = require("mongoose");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 255,
    required: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    genreId: Joi.required(),
    numberInStock: Joi.number().min(0).max(10).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });
  return schema.validate(movie);
};

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
