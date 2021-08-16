const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const valiadateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
  });

  return schema.validate(genre);
};

module.exports.Genre = Genre;
module.exports.valiadateGenre = valiadateGenre;
