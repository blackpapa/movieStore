const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");
const { valiadateGenre, Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.post("/", validate(valiadateGenre), async (req, res) => {
  const genre = new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.send(genre);
});

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
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
