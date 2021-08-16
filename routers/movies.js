const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");
const { validateMovie, Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const _ = require("lodash");
const express = require("express");
require("express-async-errors");
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

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  if (!movies) return res.status(404).send("No movie in the database");
  res.send(movies);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with given id can not be found");
  res.send(movie);
});

module.exports = router;
