const mongoose = require("mongoose");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 255,
    required: true,
  },
  genre: new mongoose.Schema({
    name: {
      type: String,
      minLength: 2,
      maxLength: 255,
      required: true,
    },
  }),
  numberInStock: {
    type: Number,
    min: 0,
    max: 20,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(20).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
    liked: Joi.boolean(),
  });
  return schema.validate(movie);
};

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
