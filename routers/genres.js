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

router.post("/", validate(valiadateGenre), (req, res) => {
  const genre = {
    name: req.body.name,
  };
  res.send(genre);
});

module.exports = router;
