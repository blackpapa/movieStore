const validate = require("../middlewares/validate");
const { validateMovie, Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.post("/", validate(validateMovie), async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  const movie = new Movie({
    title: req.body.title,
    genre: _.pick(genre, ["_id", "name"]),
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  await movie.save();
  res.send(movie);
});

module.exports = router;
