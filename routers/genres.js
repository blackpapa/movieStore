const validate = require("../middlewares/validate");
const express = require("express");
const { valiadateGenre, Genre } = require("../models/genre");
const router = express.Router();

router.post("/", validate(valiadateGenre), async (req, res) => {
  const genre = new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.send(genre);
});

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given id cannot be found");

  res.send(genre);
});

router.put("/:id", validate(valiadateGenre), (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given id cannot be found");

  genre.name = req.body.name;

  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const new_genres = genres.filter((g) => g.id !== parseInt(req.params.id));
  res.send(new_genres);
  //404
});

module.exports = router;
