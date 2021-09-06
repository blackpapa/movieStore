const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { validateMovie, Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const _ = require("lodash");
const express = require("express");
require("express-async-errors");
const router = express.Router();

router.post("/", [auth, validate(validateMovie)], async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

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

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with given id can not be found");
  res.send(movie);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: _.pick(genre, ["_id", "name"]),
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  res.send(movie);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with given id can not be found");

  res.send(movie);
});

module.exports = router;
