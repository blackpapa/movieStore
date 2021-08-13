const Joi = require("joi");
const validate = require("../middlewares/validate");
const express = require("express");
const router = express.Router();

const valiadateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
  });

  return schema.validate(genre);
};

const genres = [
  {
    id: 1,
    name: "History",
  },
  {
    id: 2,
    name: "Action",
  },
  {
    id: 3,
    name: "Thriller",
  },
];

router.post("/", validate(valiadateGenre), (req, res) => {
  const genre = {
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genres);
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
