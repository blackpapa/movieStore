const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");
const { valiadateGenre, Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();
require("express-async-errors");

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

  if (!genre)
    return res.status(404).send("The genre with given Id cannot be found");

  res.send(genre);
});

router.put(
  "/:id",
  [validateObjectId, validate(valiadateGenre)],
  async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!genre)
      return res.status(404).send("The genre with given Id cannot be found");

    res.send(genre);
  }
);

router.delete("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with given Id cannot be found");

  res.send(genre);
});

module.exports = router;
